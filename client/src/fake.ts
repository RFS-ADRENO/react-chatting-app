const timestamps = Array(20)
    .fill(0)
    .map(() => Date.now() - Math.floor(Math.random() * 1000000))
    .sort((a, b) => b - a); // sort in descending order

type TChat = (
    | {
          message: string;
          timestamp: number;
          side: number;
      }
    | {
          stickerId: number;
          timestamp: number;
          side: number;
      }
)[];

const fakeData = {
    users: [
        {
            name: "John Doe",
            about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
            username: "johndoe",
            isFriend: true,
        },
        {
            name: "Alex Smith",
            about: "",
            username: "alexsmith",
            isFriend: false,
        },
        {
            name: "Monica Geller",
            about: "Amet consectetur adipisicing elit. Quisquam, voluptatum.",
            username: "monicageller",
            isFriend: false,
        },
    ],
    // max 10 chats, each chat max 20 messages (newest first)
    // side 0 - other user, side 1 - current user
    chats: [
        {
            withUsername: "johndoe",
            chats: [
                {
                    message: "Hello",
                    timestamp: timestamps[0],
                    side: 1,
                },
                {
                    message: "Hi",
                    timestamp: timestamps[1],
                    side: 0,
                },
                {
                    message: "Hello",
                    timestamp: timestamps[0],
                    side: 1,
                },
                {
                    message: "Hi",
                    timestamp: timestamps[1],
                    side: 0,
                },
                {
                    message: "Hello",
                    timestamp: timestamps[0],
                    side: 1,
                },
                {
                    message: "Hi",
                    timestamp: timestamps[1],
                    side: 0,
                },
                {
                    message: "Hello",
                    timestamp: timestamps[0],
                    side: 1,
                },
                {
                    message: "Hi",
                    timestamp: timestamps[1],
                    side: 0,
                },
                {
                    message: "Hello",
                    timestamp: timestamps[0],
                    side: 1,
                },
                {
                    message: "Hi",
                    timestamp: timestamps[1],
                    side: 0,
                },
                {
                    message: "Hello",
                    timestamp: timestamps[0],
                    side: 1,
                },
                {
                    message: "Hi",
                    timestamp: timestamps[1],
                    side: 0,
                },
                {
                    message: "How are you?",
                    timestamp: timestamps[2],
                    side: 1,
                },
                {
                    message: "Great! What about you?",
                    timestamp: timestamps[3],
                    side: 0,
                },
                {
                    message: "Same goes for me",
                    timestamp: timestamps[4],
                    side: 1,
                },
                {
                    message: "LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem",
                    timestamp: timestamps[4],
                    side: 1,
                },
                {
                    message: "LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem",
                    timestamp: timestamps[4],
                    side: 1,
                },
                {
                    stickerId: 1,
                    timestamp: timestamps[5],
                    side: 1,
                },
            ] as TChat,
            read: true,
        },
        {
            withUsername: "alexsmith",
            chats: [
                {
                    message: "Hello",
                    timestamp: timestamps[0],
                    side: 0,
                },
            ] as TChat,
            read: false,
        },
    ],
};

type TFAKE = typeof fakeData;

export { fakeData, type TFAKE };
