export default function mockPlayerApi(mock: any): void {
    mock.onPost("/api/login").reply(() => {
        const data = {
            status: "ok",
            code: "000202",
            token:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJCRVRUT1IiXSwidXNlciI6InAxNCIsInNpZCI6IjRWbmxjd3NsUGJVRTc0T0g5Uk9ZenIwcVZUdDBlRSJ9.rOMmlMFOf6B9b_R92-gO44cU3AC_MTYMQpZnHAPSl60",
            channel: "4VnlcwslPbUE74OH9ROYzr0qVTt0eE",
            userSession: {
                minSide: 1,
                maxTie: 60,
                maxBet: 300,
                minBet: 5,
                minTie: 1,
                userName: "p14",
                bankerSide: 30,
                sid: "4VnlcwslPbUE74OH9ROYzr0qVTt0eE",
                tie: 8,
                playerSide: 20,
                balance: 5039.5,
                maxSide: 30,
                commission: 5,
            },
            stream: "ws://172.31.77.123:8081/ws",
            dealerProfiles: [
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Fabiola2-s.jpg",
                    id: 1,
                    fullname: "Fabiola",
                    age: 28,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Katherine2-s.jpg",
                    id: 2,
                    fullname: "Katherine",
                    age: 29,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Mariajose2-s.jpg",
                    id: 3,
                    fullname: "Maria Jose",
                    age: 30,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Default-s.png",
                    id: 4,
                    fullname: "Valerie",
                    age: 20,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Isabel2-s.jpg",
                    id: 5,
                    fullname: "Isabel",
                    age: 34,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Nicole2_-s.jpg",
                    id: 6,
                    fullname: "Nicole",
                    age: 30,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Default-s.png",
                    id: 7,
                    fullname: "Monica",
                    age: 23,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Maricel2-s.jpg",
                    id: 8,
                    fullname: "Maricel",
                    age: 30,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Dilanys2-s.jpg",
                    id: 9,
                    fullname: "Dilanys",
                    age: 24,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Default-s.png",
                    id: 10,
                    fullname: "Michelle",
                    age: 22,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Sharmin2-s.jpg",
                    id: 11,
                    fullname: "Sharmin",
                    age: 23,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Irene2-s.jpg",
                    id: 12,
                    fullname: "Irene",
                    age: 33,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Default-s.png",
                    id: 13,
                    fullname: "Maria",
                    age: 22,
                },
                {
                    photoURL: "../CommonFiles/dealerProfile/dealerPhotos/reloaded/Default-s.png",
                    id: 14,
                    fullname: "Alessa",
                    age: 25,
                },
            ],
        };
        return [200, data];
    });
}
