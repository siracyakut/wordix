import Loading from "~/components/loading";
import ErrorBox from "~/components/error-box";
import CountUp from "react-countup";
import { FaStar } from "react-icons/fa6";
import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";
import { IoWarning } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { setModal } from "~/store/modal/actions";
import { useAuth } from "~/store/auth/hooks";
import { useMutation, useQuery } from "react-query";
import { addLeaderboardService } from "~/services/leaderboard";
import { updateUserService } from "~/services/auth";
import { useGame } from "~/store/game/hooks";

export default function ResultRanking() {
  const { questions, score, correctCount, wrongCount, passCount, time } =
    useGame();
  const user = useAuth();

  const { data, error, isFetching } = useQuery(
    ["results"],
    () =>
      addLeaderboardService({
        userId: user._id,
        trueCount: correctCount,
        falseCount: wrongCount,
        passCount: passCount,
        score,
        time: Math.trunc(time / 1000),
      }),
    {
      enabled: user && questions.length > 0,
      onSuccess: () =>
        saveMutation.mutate({
          trueCount: correctCount,
          falseCount: wrongCount,
        }),
    },
  );

  const saveMutation = useMutation({
    mutationFn: (data) => updateUserService(data),
  });

  return (
    <>
      {user ? (
        isFetching ? (
          <Loading inline={true} />
        ) : error ? (
          <ErrorBox>{error.data}</ErrorBox>
        ) : (
          <div className="w-max mx-auto text-center text-medium text-xl p-5 rounded-lg flex flex-col items-center justify-center gap-4 border-[3px] border-solid [border-image:linear-gradient(to_bottom,red,rgba(0,0,0,0))_1_100%]">
            <p>
              Sıralamada{" "}
              <span className="text-2xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                <CountUp end={data.data.place.maxPlace} />
              </span>{" "}
              kişi içerisinde{" "}
              <span className="text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                <CountUp
                  start={data.data.place.maxPlace}
                  end={data.data.place.placement}
                  prefix="#"
                  suffix="."
                />
              </span>{" "}
              sıraya yerleştiniz
            </p>
            <p className="flex items-center gap-x-2">
              Toplamda <FaStar color="orange" />
              <span className="flex items-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-700">
                <CountUp start={0} end={score} decimals={2} />
              </span>{" "}
              puan kazandınız.
            </p>
          </div>
        )
      ) : (
        <Disclosure
          defaultOpen={true}
          as="div"
          className="flex flex-col items-center justify-center w-full"
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className={classNames(
                  "max-w-[450px] text-center w-full bg-yellow-500 p-2.5 flex items-center justify-between gap-4 text-black",
                  {
                    "rounded-t-md border-b-2 border-black": open,
                    "rounded-md": !open,
                  },
                )}
              >
                <div className="flex items-center gap-x-2">
                  <IoWarning size={30} />
                  <h2 className="text-xl font-extrabold">UYARI</h2>
                </div>
                <div className="w-8 h-8 flex items-center justify-center hover:bg-zinc-500 hover:text-white transition-all rounded">
                  <FaTimes size={24} />
                </div>
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="max-w-[450px] text-center w-full bg-yellow-500 p-2.5 flex flex-col rounded-b-md items-center justify-center gap-4 text-black">
                  <p>
                    İstatistiklerinizin sisteme kayıt edilmesi ve diğer
                    oyuncularla yarışabilmeniz için sitemize üye olmanız
                    gerekmekte.
                  </p>
                  <p>
                    <span
                      onClick={() => setModal("register")}
                      className="hover:text-gray-500 hover:underline cursor-pointer"
                    >
                      Buraya tıklayarak
                    </span>{" "}
                    hemen ücretsiz üye olabilirsiniz.
                  </p>
                  <p>
                    Sayfayı kapatmayıp üye olursanız şu anki sonuçlarınız
                    sisteme kayıt edilecek ve liderlik tablosuna gireceksiniz!
                  </p>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      )}
    </>
  );
}
