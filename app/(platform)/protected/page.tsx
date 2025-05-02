// import { auth, currentUser } from "@clerk/nextjs/server";

// const ProtectedPage = async () => {
//   const user = await currentUser();
//   const { userId } = await auth();

//   return <div className="">
//     User : {user?.firstName}
//     UserId : {userId}
//     </div>;
// };

// export default ProtectedPage;

// "use client"
// import { useAuth, useUser } from "@clerk/nextjs";

// const ProtectedPage = () => {
//   const { user } =  useUser();
//   const { userId } =  useAuth();

//   return <div className="">
//     User : {user?.firstName}
//     UserId : {userId}
//     </div>;
// };
// export default ProtectedPage;

"use client";
import {UserButton } from "@clerk/nextjs";

const ProtectedPage = () => {

  return (
    <div className="">
      <UserButton 
      />
    </div>
  );
};

export default ProtectedPage;
