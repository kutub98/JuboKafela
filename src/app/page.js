/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { Button, Input } from "@material-tailwind/react";
import { toPng } from "html-to-image";

export default function Home() {
  const [name, setName] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [totalTaka, setTotalTaka] = useState("");
  const [controlSubmit, setControlSubmit] = useState(false);
  const receiptRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !serialNo || !yearFrom || !yearTo || !totalTaka) {
      setControlSubmit(false);
      return;
    }

    setControlSubmit(true);
  };

  const handleDownloadImage = async () => {
    if (receiptRef.current === null) return;

    try {
      const dataUrl = await toPng(receiptRef.current, {
        quality: 1.0,

        style: {
          textAlign: "justify", // Justifies text content in the image
          padding: "20px",
          fontSize: "18px",
          fontFamily: "Arial, sans-serif",
          color: "#333",
          backgroundColor: "#fff"
        }
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "receipt.png";
      link.click();
    } catch (error) {
      console.error("Failed to download image", error);
    }
  };

  return (
    <div className="flex justify-center items-center border-t bg-white p-8">
      <div className="w-full max-w-5xl overflow-hidden mx-auto items-center bg-white px-4 py-4 rounded shadow-xl">
        {/* MainBox */}
        <div
          className={`grid gap-4 ${
            controlSubmit ? "grid-cols-12" : "grid-cols-6 justify-center"
          }`}
        >
          <div
            className={`grid ${
              controlSubmit ? "lg:col-span-4" : "lg:col-span-6 "
            } col-span-12 bg-gray-50 p-5`}
          >
            <form onSubmit={handleSubmit} className="block space-y-2">
              <Input
                className="px-2 py-2 rounded shadow border border-gray-400 bg-gray-100 text-black"
                name="name"
                required
                label="নাম"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                className="px-2 py-2 rounded shadow border border-gray-400 bg-gray-100 text-black"
                name="serialNo"
                required
                label="সদস্য নং"
                placeholder="সদস্য নং"
                onChange={(e) => setSerialNo(e.target.value)}
              />
              <Input
                className="px-2 py-2 rounded shadow border border-gray-400 bg-gray-100 text-black"
                name="YearFrom"
                required
                label="সাল থেকে"
                placeholder="সাল থেকে "
                onChange={(e) => setYearFrom(e.target.value)}
              />
              <Input
                className="px-2 py-2 rounded shadow border border-gray-400 bg-gray-100 text-black"
                name="YearTo"
                label="সাল পর্যন্ত"
                placeholder="সাল পর্যন্ত"
                onChange={(e) => setYearTo(e.target.value)}
              />
              <Input
                className="px-2 py-2 rounded shadow border border-gray-400 bg-gray-100 text-black"
                name="totalTaka"
                label="সর্বমোট টাকা"
                required
                placeholder="Total Taka"
                onChange={(e) => setTotalTaka(e.target.value)}
              />
              <div className="flex space-x-2">
                <Button className="bg-green-500 text-white" type="submit">
                  Submit
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  type="reset"
                  onClick={() => setControlSubmit(false)}
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>

          {controlSubmit && (
            <div
              ref={receiptRef}
              className="grid lg:col-span-8 col-span-12 p-5 bgImg bg-[#ffffff] border-2"
            >
              <div className="text-left mb-6 block">
                <h1 className="mb-3 font-semibold text-center">
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </h1>
                <h1 className="my-2 font-semibold">
                  কলাউজান ইসলামী যুব কাফেলা
                </h1>
                <h1 className="text-sm mb-2">কলাউজান ইসলামী যুব কাফেলা</h1>
                <h1 className="text-sm mb-2">কলাউজান, লোহাগাড়া, চট্টগ্রাম</h1>
                <h1 className="text-sm mb-1 font-semibold">
                  <span>বিষয়:</span>
                  <span>মাসিক বকেয়া পরিশোধ</span>
                </h1>
              </div>
              <p>জনাব,</p>
              <p>
                {`আস-সালামু'আলাইকুম`} ওয়া রহমাতুল্লাহ। সম্মানিত সদস্য জনাব{" "}
                <span className="font-bold">{name}</span> আপনার সদস্য নাম্বার{" "}
                <span className="font-bold">{serialNo}</span> ‍। আপনাকে অতি
                জরুরী ভাবে জানানো যাচ্ছে যে{" "}
                <span className="font-bold">যুব কাফেলার</span> বিগত সাধারণ সভার
                সিদ্ধান্ত অনুসারে আগামী ফেব্রুওয়ারী ২৮ তারিখের মধ্যে আপনার বকেয়া{" "}
                <span className="font-bold">{yearFrom}</span> সাল থেকে{" "}
                <span className="font-bold">{yearTo}</span> সাল পর্যন্ত সর্বমোট{" "}
                <span className="font-bold">{totalTaka}</span> টাকা আদায় করিতে
                হবে।
              </p>

              <div className="flex flex-col justify-center">
                <div className="flex md:flex-row flex-col justify-between gap-2 my-8">
                  {/* BANK  */}
                  <div className=" justify-center gap-2">
                    <img
                      alt=" Bank"
                      className="h-10 w-10 rounded-full "
                      src="https://upload.wikimedia.org/wikipedia/en/1/12/Logo_of_Islami_Bank_Bangladesh_PLC.png"
                    />
                    <h1 className="flex flex-col gap-1">
                      <span className="font-bold"> Bank: Islami Bank</span>
                      <span className="font-bold">
                        Account no: 20501560206788414
                      </span>
                      <span className="font-bold">
                        Title :Kalauzan Islami Jubo Kafela.
                      </span>
                      <span className="font-bold"> Branch: lohagra Branch</span>
                    </h1>
                  </div>
                  {/* Bkash, nagagd ,  */}
                  <div className=" justify-center gap-2">
                    <div className="flex gap-0">
                      <img
                        alt=" Bank"
                        className="h-10 w-10 rounded-full"
                        src="https://logos-download.com/wp-content/uploads/2022/01/BKash_Logo_icon.png"
                      />
                      <img
                        alt=" Bank"
                        className="h-10 w-10 rounded-full "
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNnBn5UsrdvnY_GLQSw4N64XXxkqxULBwv7AfGFcGQOBOY4Z84WsKaU_XLHx6ajvsqnGY&usqp=CAU"
                      />
                    </div>

                    <h1 className="flex flex-col gap-1">
                      <span className="font-bold"> BKash</span>
                      <span className="font-bold">Mobile no: 01601188696</span>
                      <span className="font-bold">Kutub Uddin</span>
                    </h1>
                  </div>
                </div>
                <div className="text-red-600 bg-white shadow-sm p-2 mx-auto text-sm">
                  [বি:দ্র: টাকা পেমেন্ট করলে সেটার ছবি বা স্ক্রীনসট দিতে হবে,
                  টাকা আদায় করার পর অবশ্যই রশিদ সংগ্রহ করে নিবেন]
                </div>
              </div>
              <div className="my-4">
                <p>নিবেদক</p>
                <p>কুতুব উদ্দীন</p>
                <p>অর্থ সম্পাদক</p>
              </div>
            </div>
          )}
        </div>
        {controlSubmit && (
          <div className="flex justify-center w-full">
            <Button onClick={handleDownloadImage}>Download</Button>
          </div>
        )}
      </div>
    </div>
  );
}
