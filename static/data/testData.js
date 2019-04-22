const testStr = require("./test.js");
const testImg = require("@/assets/logo.png");
export default {
    testInfo: {
        articleTitle: "articleTitle",
        image_url: testImg,
        userName: "userName",
        commentTime: "2019年4月21日 16:30:00",
        commentOrigin: `测试commentOrigin,测试commentOrigin,测试commentOrigin,测试commentOrigin,测试commentOrigin,测试commentOrigin,测试commentOrigin,测试commentOrigin,测试commentOrigin,测试commentOrigin,测试commentOrigin,测试commentOrigin,测试commentOrigin,测试commentOrigin,测试commentOrigin`,
        commentReply: `测试commentReply,测试commentReply,测试commentReply,测试commentReply,测试commentReply,测试commentReply,测试commentReply,测试commentReply,测试commentReply,测试commentReply,测试commentReply,测试commentReply,测试commentReply,测试commentReply,测试commentReply`,
    },
    testData: [
        {
            img: testImg,
            title: "title1",
            tag: "tag1",
            time: "2019年4月12日",
            summary: testStr,
            like: 1453
        },
        {
            img: testImg,
            title: "title2",
            tag: "tag1",
            time: "2019年4月12日",
            summary: testStr,
            like: 1453
        },
        {
            img: testImg,
            title: "title3",
            tag: "tag1",
            time: "2019年4月12日",
            summary: testStr,
            like: 1453
        },
        {
            img: testImg,
            title: "title4",
            tag: "tag1",
            time: "2019年4月12日",
            summary: testStr,
            like: 1453
        }
    ],
    testTagsData: [
        {
            key: 1,
            label: "Tags1",
        },{
            key: 2,
            label: "Tags2",
        },{
            key: 3,
            label: "Tags3",
        },{
            key: 4,
            label: "Tags4",
        },{
            key: 5,
            label: "Tags5",
        },{
            key: 6,
            label: "Tags6",
        },{
            key: 7,
            label: "Tags7",
        },{
            key: 8,
            label: "Tags8",
        },{
            key: 9,
            label: "Tags9",
        },{
            key: 10,
            label: "Tags10",
        },{
            key: 11,
            label: "Tags11",
        },{
            key: 12,
            label: "Tags12",
        },{
            key: 13,
            label: "Tags13",
        },{
            key: 14,
            label: "Tags14",
        },{
            key: 15,
            label: "Tags15",
        },{
            key: 16,
            label: "Tags16",
        },{
            key: 17,
            label: "Tags17",
        },{
            key: 18,
            label: "Tags18",
        },{
            key: 19,
            label: "Tags19",
        },{
            key: 20,
            label: "Tags20",
        },{
            key: 22,
            label: "Tags20",
        }
    ]
}
