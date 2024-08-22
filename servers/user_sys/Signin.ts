'use server'
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export default async function Signin(formData: FormData) {
    try {
        const cookie = cookies();
        const role = formData.get("role");
        const username = formData.get("username");
        const password = formData.get("password");

        if (role === "student") {
            const select_user = await prisma.student.findFirst({
                where: {
                    username: username?.toString()
                }
            })

            if (select_user) {
                if (password == select_user.password) {
                    const create_token = jwt.sign({
                        uid: select_user.id,
                        role: "student"
                    }, process.env.SECRET + "_uid_select", {
                        expiresIn: "24h"
                    })

                    cookie.set("token", create_token);

                    return {
                        s: true,
                        m: "signin success.",
                        r: "student"
                    }
                } else {
                    return {
                        s: false,
                        m: "password incorrect."
                    }
                }
            } else {
                return {
                    s: false,
                    m: "not found user."
                }
            }
        }

        if (role === "teacher") {
            const select_user = await prisma.teacher.findFirst({
                where: {
                    username: username?.toString()
                }
            })

            if (select_user) {
                const compare_pass = await bcrypt.compare(password?.toString() as string, select_user.password);

                if (compare_pass) {
                    const create_token = jwt.sign({
                        uid: select_user.id,
                        role: "teacher"
                    }, process.env.SECRET + "_uid_select", {
                        expiresIn: "24h"
                    })

                    return {
                        s: true,
                        m: "signin success.",
                        access_token: create_token.toString(),
                        r: "teacher"
                    }
                } else {
                    return {
                        s: false,
                        m: "password incorrect."
                    }
                }
            } else {
                return {
                    s: false,
                    m: "not found user."
                }
            }
        }

        return {
            s: false,
            m: "please select role."
        }
    } catch (error) {
        return {
            s: false,
            m: "something went wrong.",
            e: error
        }
    }
}