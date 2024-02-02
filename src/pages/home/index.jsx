import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getQuestionByLetter } from "~/services/questions";
import Loading from "~/components/loading";
import ErrorBox from "~/components/error-box";
import { useAuth } from "~/store/auth/hooks";
import { setModal } from "~/store/modal/actions";

export default function Home() {
  const user = useAuth();
  const { data, error, isFetching } = useQuery(["introQuestion"], () =>
    getQuestionByLetter("A"),
  );

  return !isFetching ? (
    error ? (
      <ErrorBox>{error.data}</ErrorBox>
    ) : (
      <motion.div
        initial={{ opacity: 0, translateY: 30 }}
        animate={{ opacity: 1, translateY: 0 }}
        className="w-full mx-auto py-5 text-center"
      >
        <div>
          <span className="text-[30px] font-bold bg-clip-text text-transparent bg-gradient-to-t from-[#fd0000] to-[#250000]">
            WORDIX&apos;e
          </span>
          <span className="text-xl ml-[10px]">Hoş Geldiniz!</span>
        </div>
        <p className="mt-[15px] pb-[10px] border-b-2 border-light dark:border-zinc-500">
          Oyunun amacı, cevabı alfabede bulunan 26 Türkçe harf ile başlayan
          soruların cevaplarını bulmaktır.
        </p>
        <p className="mt-[15px] pb-[10px] border-b-2 border-light dark:border-zinc-500">
          Örneğin: <b>{data.data.question}</b> sorusunda aktif karakter{" "}
          <b>{data.data.letter}</b> ise bunun cevabı <b>{data.data.answer}</b>{" "}
          gibi.
        </p>
        <p className="mt-[15px] pb-[10px] border-b-2 border-light dark:border-zinc-500">
          Her karaktere karşılık gelen sorunun cevabı, o karakter ile başlar.
        </p>
        <p className="mt-[15px] pb-[10px] border-b-2 border-light dark:border-zinc-500">
          Cevabın <b>🟩 Doğru</b> ya da <b>🟥 Yanlış</b> olabilir. Eğer cevabı
          bilmiyorsan <b>🟨 PAS</b> butonuna bas ya da <b>pas</b> yazıp gönder.
        </p>
        <p className="mt-[15px] pb-[10px] border-b-2 border-light dark:border-zinc-500">
          Oyunun toplam süresi 5 dakika&apos;dır.
        </p>
        <p className="mt-[15px] pb-[10px] border-b-2 border-light dark:border-zinc-500">
          Eğer sayfayı yenilersen oyun en baştan başlar!
        </p>
        {user ? (
          <Link
            to="/game"
            reloadDocument={true}
            className="inline-block mt-[30px] py-[15px] px-[30px] bg-[#fd0000] rounded-[30px] text-white font-bold shadow-[0_0_20px_gold] dark:shadow-[0_0_20px_grey] transition-all hover:translate-x-1 hover:translate-y-1"
          >
            OYUNU BAŞLAT!
          </Link>
        ) : (
          <button
            onClick={() => setModal("ask-register")}
            type="button"
            className="mt-[30px] py-[15px] px-[30px] bg-[#fd0000] rounded-[30px] text-white font-bold shadow-[0_0_20px_gold] dark:shadow-[0_0_20px_grey] transition-all hover:translate-x-1 hover:translate-y-1"
          >
            OYUNU BAŞLAT!
          </button>
        )}
      </motion.div>
    )
  ) : (
    <Loading />
  );
}
