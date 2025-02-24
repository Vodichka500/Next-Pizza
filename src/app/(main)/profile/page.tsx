import { getServerSession } from 'next-auth';
import {authOptions} from "@/lib/authOptions";
import { redirect } from 'next/navigation';
import {prisma} from "../../../../prisma/prisma-client";
import Profile from "@/components/profile/Profile";
const profilePage = async () => {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return redirect('/not-auth');
    }

    let id
    if(session.user.id){
        id = session.user.id
    }


    const user = await prisma.user.findFirst({ where: { id: Number(id) } });
    console.log(user)

    if (!user) {
        return redirect('/not-auth');
    }

    return <Profile user={user} />;
}
export default profilePage