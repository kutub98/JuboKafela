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
        width: 800,
        height: 400
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
                type="number"
                required
                label="সদস্য নং"
                placeholder="সদস্য নং"
                onChange={(e) => setSerialNo(e.target.value)}
              />
              <Input
                className="px-2 py-2 rounded shadow border border-gray-400 bg-gray-100 text-black"
                name="YearFrom"
                required
                type="number"
                label="সাল থেকে"
                placeholder="সাল থেকে "
                onChange={(e) => setYearFrom(e.target.value)}
              />
              <Input
                className="px-2 py-2 rounded shadow border border-gray-400 bg-gray-100 text-black"
                name="YearTo"
                type="number"
                label="সাল পর্যন্ত"
                placeholder="সাল পর্যন্ত"
                onChange={(e) => setYearTo(e.target.value)}
              />
              <Input
                className="px-2 py-2 rounded shadow border border-gray-400 bg-gray-100 text-black"
                name="totalTaka"
                label="সর্বমোট টাকা"
                type="number"
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
                <h1 className="mb-2 font-semibold">
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
                আসালামুয়ালাইকুম। সম্মানিত সদস্য জনাব{" "}
                <span className="font-bold">{name}</span> আপনার সদস্য নাম্বার{" "}
                <span className="font-bold">{serialNo}</span> ‍। আপনাকে অতি
                জরুরী ভাবে জানানো যাচ্ছে যে{" "}
                <span className="font-bold">যুব কাফেলার</span> বিগত সাধারণ সভার
                সিদ্ধান্ত অনুসারে আগামী ডিসেম্বর ৩০ তারিখের মধ্যে আপনার বকেয়া{" "}
                <span className="font-bold">{yearFrom}</span> টু{" "}
                <span className="font-bold">{yearTo}</span> সর্বমোট{" "}
                <span className="font-bold">{totalTaka}</span> টাকা আদায় করিতে
                হবে।
              </p>

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
