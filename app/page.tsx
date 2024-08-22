'use client'
import Signin from "@/servers/user_sys/Signin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const [role, setRole] = useState("none");
  const router = useRouter();

  const formSubmitHandle = async (data: FormData) => {
    const signin = await Signin(data);

    console.log(signin);

    if (signin.s) {
      const role = signin.r;

      if (role === "student") {
        router.push("/student");
      } else if (role === "teacher") {
        router.push("/teacher");
      } else {
        Swal.fire({
          icon: "error",
          title: "ผิดพลาด",
          text: "มีบางอย่างผิดพลาดโปรดแจ้งแอดมิน",
          confirmButtonText: "ลองอีกครั้ง"
        })
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "ผิดพลาด...",
        text: "ชื่อผู้ใช้หรือรหัสผ่านผิด",
        confirmButtonText: "ลองอีกครั้ง"
      })
    }
  }

  return (
    <>
      <div className="flex flex-col items-center pt-16 h-screen bg-white">
        <img src="/images/xl_nr_logo.jpg" className="w-44" alt="application logo" />
        <h1 className="mt-5 mb-2 text-3xl text-center text-blue-500">
          ระบบแจ้งและบันทึกผลการเรียน
          <div className="my-2"></div>
          Grader for Nr.
        </h1>
        <label className="text-gray-500 text-lg">โรงเรียนนางรอง</label>
        <form action={formSubmitHandle} className="mt-16 w-80 text-sm">
          <select onChange={(e) => {
            const val = e.target.value;

            if (val === "student") {
              setRole("student");
            }

            if (val === "teacher") {
              setRole("teacher");
            }

            if (val === "none") {
              setRole("none");
            }

          }} name="role" id="role" className="border p-2 px-3 text-gray-500 w-full outline-none focus:border-green-500">
            <option value="none">-- เลือกผู้ใช้งาน --</option>
            <option value="student">นักเรียน</option>
            <option value="teacher">ครู/อาจารย์</option>
          </select>
          <input
            type="text"
            className="p-2 px-3 border w-full mt-5 outline-none focus:border-green-500 transition-all duration-200"
            placeholder={
              role === "teacher"
                ? "ชื่อผู้ใช้"
                : role === "student"
                  ? "รหัสนักเรียน"
                  : "กรุณาเลือกสถานะผู้ใช้"
            }

            disabled={role === "none" && true}
          />
          <input
            type="password"
            className="p-2 px-3 border w-full mt-5 outline-none focus:border-green-500 transition-all duration-200"
            placeholder={
              role === "teacher"
                ? "รหัสผ่าน"
                : role === "student"
                  ? "เลขประจำตัวประชาชน"
                  : "กรุณาเลือกสถานะผู้ใช้"
            }
            name="password"
            id="password"
            disabled={role === "none" && true}
          />
          <button disabled={role == "none" && true} type="submit" className={role === "none" ? "w-full mt-5 p-2 bg-red-400 text-white rounded" : "w-full mt-5 p-2 bg-red-500 text-white rounded active:bg-red-600"}>
            เข้าสู่ระบบ
          </button>
          <div className="flex justify-center mt-3">
            <Link href={"/forgot-pass"} className="p-1 px-2 text-xs rounded border border-gray-400 text-gray-400 hover:bg-gray-100 transition-all duration-200">
              ลืมรหัสผ่าน
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
