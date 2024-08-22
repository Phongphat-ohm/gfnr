'use client'
import GetUser from "@/servers/user_sys/GetUser"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaClipboard, FaHouse } from "react-icons/fa6";

export interface UserData {
    email: string
    f_name: string
    l_name: string
    Class: Class
}

export interface Class {
    id: string
    name: string
    year: any
}


export default function StudentNavbar() {
    const [userData, setuserData] = useState<UserData>({ "email": "{อีเมล}", "f_name": "{ชื่อ}", "l_name": "{นามสกุล}", "Class": { "id": "{รหัสห้อง}", "name": "{ชื่อห้อง}", "year": "{ปีการศึกษา}" } });
    const router = useRouter();

    useEffect(() => {
        handleGetUser()
    }, [])

    const handleGetUser = async () => {
        const get = await GetUser();

        if (get?.s) {
            setuserData(get.d as UserData);
        } else {
            router.push("/");
        }
    }

    return (
        <>
            <div className="p-5 fixed w-full shadow bg-white flex items-center justify-around">
                <h1 className="text-2xl font-blod text-blue-500">
                    Grade For Nr.
                </h1>
                <ul className="flex gap-10">
                    <li className="flex flex-col gap-1">
                        <Link href={"/student"} className="flex gap-2 items-center peer text-gray-600 hover:text-blue-500">
                            <FaHouse />
                            หน้าหลัก
                        </Link>
                        <span className="p-0.5 w-0 bg-blue-white transition-all duration-300 peer-hover:bg-blue-500 peer-hover:w-full"></span>
                    </li>
                    <li className="flex flex-col gap-1">
                        <Link href={"/grade"} className="flex gap-2 items-center peer text-gray-600 hover:text-blue-500">
                            <FaClipboard />
                            เช็กผลการเรียน
                        </Link>
                        <span className="p-0.5 w-0 bg-blue-white transition-all duration-300 peer-hover:bg-blue-500 peer-hover:w-full"></span>
                    </li>
                </ul>
                <Link href={"/student/settings"} className="p-2 border flex rounded-full hover:bg-gray-100 items-center gap-2 px-4 transition-all duration-200">
                    <img src="/images/logo_nr.png" className="w-5 rounded-full" alt="user image" />
                    {userData?.f_name + " " + userData?.l_name}
                </Link>
            </div>
        </>
    )
}