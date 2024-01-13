import { useEffect, useState } from "react";
import Card from "./components/Card";
import Input from "./components/Input";
import SearchBar from "./components/SearchBar.jsx";
import { getBankInfo } from "./service/getBankInfo.js";
import { Context } from "./hooks/context";

export default function App() {
  const bankId = import.meta.env.VITE_BANK_ID;
  const bankAccount = import.meta.env.VITE_BANK_ACCOUNT;
  const [bankInfo, setBankInfo] = useState([]);
  const [fliteredBank, setFilteredBank] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    content: "",
    bankId: "",
    deeplink: "",
  });
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
  };

  useEffect(() => {
    const filteredItems = bankInfo.filter((bank) =>
      bank.appName.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredBank(filteredItems);
  }, [bankInfo, search]);

  useEffect(() => {
    (async () => {
      let data = await getBankInfo();
      setBankInfo(data);
    })();
  }, []);

  return (
    <section className="flex flex-col flex-grow items-center justify-start bg-gray-100 dark:bg-gray-900 w-full overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <h1 className=" mb-2 mt-4 whitespace-pre-line text-center font-bold uppercase text-blue-600 sm:whitespace-normal sm:text-xl md:text-base lg:text-lg dark:text-white">
          Chuyển tiền một chạm
        </h1>
        <p className="text-center text-sm leading-relaxed text-gray-800 antialiased hover:subpixel-antialiased sm:text-lg dark:text-gray-200">
          Vui lòng điền đầy đủ thông tin ở dưới
        </p>
      </div>
      <Context.Provider
        value={{ handleSearch, fliteredBank, formData, setFormData }}
      >
        <form className="mx-auto my-4 flex w-full flex-col border border-gray-200 bg-white px-2 py-4 shadow-md shadow-gray-300 transition-shadow sm:mb-8 sm:rounded sm:py-8 dark:border-none dark:bg-gray-800/50 dark:shadow-none">
          <p className="text-center text-base font-semibold leading-relaxed text-gray-800 antialiased hover:subpixel-antialiased dark:text-gray-200">
            Thông tin chuyển khoản
          </p>
          <div className="mb-2 mt-6 flex flex-row">
            <div className="px-1 w-1/3">
              <Input
                id={"amount"}
                title={"Số tiền"}
                isRequired={true}
                placeholder={"25000 VND"}
                handleChange={handleChange}
              />
            </div>
            <div className="px-1 w-2/3">
              <Input
                id={"content"}
                title={"Tin nhắn"}
                isRequired={false}
                placeholder={"Lớp 11A1 - Tiền học kỳ 1 - 33hs"}
                handleChange={handleChange}
              />
            </div>
          </div>

          <p className="text-center text-base font-semibold leading-relaxed text-gray-800 antialiased hover:subpixel-antialiased dark:text-gray-200">
            Vui lòng chọn ngân hàng của bạn
          </p>
          <SearchBar />
          <div className="px-3 mt-6 w-full h-[calc(100vh-32rem)] overflow-y-auto grid grid-cols-3 gap-2.5">
            {fliteredBank?.length > 0 ? (
              <Card />
            ) : (
              <div className="flex items-center text-center border border-red-500 rounded w-full col-span-4 mx-auto">
                <div className="flex flex-col w-full px-4 py-2 mx-auto">
                  <h1 className="text-base font-medium dark:text-red-400 text-red-600">
                    Không tìm thấy ngân hàng
                  </h1>
                  <p className="antialiased hover:subpixel-antialiased mt-2 text-xs text-gray-500 dark:text-gray-400 whitespace-pre-line">
                    Xin vui lòng kiểm tra và thử lại
                  </p>
                </div>
              </div>
            )}
          </div>
        </form>
      </Context.Provider>
      <div className="w-full flex flex-row space-x-2 px-6 mb-4">
        <div className="w-1/2">
          <button
            type="button"
            onClick={() =>
              window.open(
                `https://img.vietqr.io/image/${bankId}-${bankAccount}-compact2.png?amount=${
                  formData.amount !== "" ? formData.amount : 0
                }&addInfo=${
                  formData.content !== ""
                    ? formData.content
                    : new Date().toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                }&accountName=Đỗ%20Thị%20Hiếu%20Ngọc`,
                "_blank"
              )
            }
            disabled={formData.amount === ""}
            className="flex items-center justify-center w-full py-2 px-3 font-medium text-white transition duration-200 rounded shadow-md focus:shadow-outline focus:outline-none bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-600 disabled:bg-transparent border-2 border-emerald-600 hover:border-emerald-500 disabled:border-gray-400 disabled:dark:border-gray-600 disabled:boder-gray-300 disabled:text-gray-500 disabled:dark:text-gray-500 disabled:cursor-not-allowed"
          >
            <span className="text-base font-semibold">Lấy mã QR</span>
          </button>
        </div>
        <div className="w-1/2">
          <button
            type="submit"
            onClick={() =>
              window.location.replace(
                formData.deeplink !== ""
                  ? `${formData.deeplink}&ba=${bankAccount}@${bankId}&am=${formData.amount}&tn=${formData.content}`
                  : null
              )
            }
            disabled={fliteredBank.length === "" || formData.deeplink === ""}
            className="flex items-center justify-center w-full py-2 px-3 font-medium text-white transition duration-200 rounded shadow-md focus:shadow-outline focus:outline-none bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:dark:text-gray-400 border-2 border-blue-600 hover:border-blue-500 disabled:border-transparent disabled:cursor-not-allowed"
          >
            <span className="text-base font-semibold">Chuyển khoản</span>
          </button>
        </div>
      </div>
    </section>
  );
}
