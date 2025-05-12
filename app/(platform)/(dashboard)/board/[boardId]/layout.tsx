import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ boardId: string }>
}) {
  const { orgId } = await auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const { boardId } = await params;

  console.log("Board ID:", boardId);

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  return {
    title: board?.title || "",
  };
}

const boardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ boardId: string }>
}) => {
  const { orgId } = await auth();
  const { boardId } = await params;

  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  if (!board) {
    notFound(); //redirige vers une not found page (next 14)
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />

      <div className="absolute inset-0 bg-black/10" />

      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default boardIdLayout;
