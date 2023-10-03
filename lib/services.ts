import { Query, databases } from "@/appwrite";

export const getUsersFromDB = async () => {
  // const limit = 5;
  // const offset = 0;
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
    [
      Query.orderAsc("username"),
      // Query.limit(limit),
      // Query.offset(offset)
    ]
  );
  data.documents.sort((a, b) => {
    return b.$createdAt.localeCompare(a.$createdAt);
  });
  let items: User[] = [];
  for (let i = 0; i < data.documents.length; i++) {
    const item = data.documents[i];
    const user: User = {
      id: item.$id,
      username: item.username,
      firstname: item.firstname,
      lastname: item.lastname,
    };
    items.push(user);
  }
  const list: Board = {
    users: items,
    total: data.documents.length,
  };
  return list;
};

export const createNewUser = async (user: any) => {
  try {
    const res = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
      "",
      user
    );
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: error,
      $id: null,
    };
  }
};

export const updateUserById = async (user: User) => {
  const params = {
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
  };
  await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
    user.id || "",
    params
  );
};

export const removeUserById = async (id: string) => {
  await databases.deleteDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!,
    id
  );
};
