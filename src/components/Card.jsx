import { useContext } from "react";
import { Context } from "../hooks/context";

function Card() {
  const { fliteredBank, formData, setFormData } = useContext(Context);
  const sellectedBank = formData.bankId;
  return fliteredBank?.map((bank) => (
    <button
      key={bank.appId}
      type="button"
      className={`flex flex-col space-y-1.5 rounded border h-full w-full min-w-fit max-h-fit text-gray-800 dark:text-white justify-center p-2 ${
        sellectedBank === bank.appId
          ? "border-green-300 dark:border-green-700 bg-indigo-400 dark:bg-indigo-600"
          : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
      }`}
      onClick={(e) => {
        e.preventDefault();
        setFormData({
          ...formData,
          bankId: bank.appId,
          deeplink: bank.deeplink,
        });
      }}
    >
      <img
        className="h-full max-h-16 w-full max-w-16 mx-auto bg-center bg-no-repeat object-cover rounded-lg aspect-square"
        src={bank.appLogo || "https://placehold.co/600x400"}
        alt={bank.appName}
      />
      <p className="text-center w-full text-xs font-semibold line-clamp-2 h-8">
        {bank.appName}
      </p>
    </button>
  ));
}

export default Card;
