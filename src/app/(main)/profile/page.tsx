import { getServerSession } from 'next-auth';
import {authOptions} from "@/lib/authOptions";
import { redirect } from 'next/navigation';
import {prisma} from "../../../../prisma/prisma-client";
import Profile from "@/components/profile/Profile";
const profilePage = async () => {

    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/not-auth');
    }


    const user = await prisma.user.findFirst({ where: { id: Number(session?.user.id) } });
    console.log(user)

    if (!user) {
        return redirect('/not-auth');
    }

    return <Profile user={user} />;
}
export default profilePage