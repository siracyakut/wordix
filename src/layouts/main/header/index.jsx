import { Link, useNavigate } from "react-router-dom";
import { MdLeaderboard } from "react-icons/md";
import Button from "~/components/button";
import { FaUser } from "react-icons/fa6";
import { setModal } from "~/store/modal/actions";
import { useAuth } from "~/store/auth/hooks";
import { FaSignOutAlt } from "react-icons/fa";
import { useMutation } from "react-query";
import { logoutService } from "~/services/auth";
import toast from "react-hot-toast";
import { destroyUser } from "~/store/auth/actions";

export default function Header() {
  const user = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => logoutService(),
    onSuccess: () => {
      destroyUser();
      navigate("/");
      toast.success("Başarıyla çıkış yaptınız.");
    },
    onError: (error) => toast.error(error.data),
  });

  return (
    <div className="pb-8 md:pb-0 md:px-14 w-full grid place-items-center md:flex md:items-center md:justify-between border-b-[3px] border-[#eeeeee] dark:border-zinc-500">
      {/*desktop leaderboard button*/}
      <div className="md:w-52 md:flex md:items-center md:justify-center">
        <Button
          className="md:w-max hidden md:block"
          component={Link}
          to="/leaderboards"
        >
          <MdLeaderboard size={25} />
        </Button>
      </div>
      <div className="flex items-center justify-center flex-col gap-0.5 p-[25px] text-center">
        <Link
          to="/"
          className="uppercase text-[36px] tracking-[15px] font-bold bg-clip-text text-transparent bg-gradient-to-t from-[#333333] to-[#b6b5b5] dark:from-yellow-950 dark:to-yellow-300"
        >
          WORDIX
        </Link>
        <span className="text-[15px] tracking-[3px] font-light">
          Yeni nesil kelime oyunu!
        </span>
      </div>
      <div className="md:w-52 flex items-center justify-center gap-x-4">
        {user ? (
          <Button
            type="button"
            disabled={mutation.isLoading}
            onClick={() => mutation.mutate()}
            component="button"
          >
            <FaSignOutAlt size={25} />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => setModal("login")}
            component="button"
          >
            <FaUser size={25} />
          </Button>
        )}
        {/*mobile leaderboard button*/}
        <Button className="block md:hidden" component={Link} to="/leaderboards">
          <MdLeaderboard size={25} />
        </Button>
      </div>
    </div>
  );
}
