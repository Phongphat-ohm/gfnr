'use server'
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GetUser() {
    try {
        const cookie = cookies();
        const token = cookie.get("token");

        if (token) {
            const vertify: any = jwt.verify(token?.value.toString() as string, process.env.SECRET + "_uid_select");
            const uid = vertify.uid;
            const role = vertify.role;

            if (role == "student") {
                const get_stu = await prisma.student.findFirst({
                    where: {
                        id: uid
                    },
                    select: {
                        email: true,
                        f_name: true,
                        l_name: true,
                        Class: true
                    }
                })

                if (get_stu) {
                    return {
                        s: true,
                        m: "success.",
                        d: get_stu
                    }
                } else {
                    return {
                        s: false,
                        m: "user not found"
                    }
                }
            } else if (role == "teacher") {
                const get_teach = await prisma.teacher.findFirst({
                    where: {
                        id: uid
                    },
                    select: {
                        email: true,
                        f_name: true,
                        l_name: true,
                        Subject: true
                    }
                })

                if (get_teach) {
                    return {
                        s: true,
                        m: "success.",
                        d: get_teach
                    }
                } else {
                    return {
                        s: false,
                        m: "user not found"
                    }
                }
            }

        } else {
            return {
                s: false,
                m: "please logged in"
            }
        }
    } catch (error) {
        return {
            s: false,
            m: "something went wrong.",
            e: error
        }
    }
}