import {ISerializedApp} from "./model/_types/serialization/ISerializedApp";
import {ISerializedSection} from "./model/_types/serialization/ISerializedSection";

export const sections: ISerializedSection[] = [
    {
        ID: "4",
        type: "present",
        name: "Discussed retirement",
        creationDate: 1684706673235,
        memories: [
            {
                ID: "0",
                type: "text",
                description:
                    "Having spoken with Tom about his heartfelt conversation with Gandalf, I am struck by the deep connection they shared. Tom's words painted a vivid picture of their discussion, set against the backdrop of a serene day. It is clear that the bond they formed was special, as they contemplated their dreams for retirement in each other's company. While it saddens me that Gandalf's journey was cut short, I can't help but feel hopeful for Tom. The wisdom and inspiration he gained from their conversation will always be with him, guiding him towards his own well-deserved retirement. Though Gandalf may not have reached that stage, Tom can still embark on his own path of fulfillment and discovery, carrying with him the memories of their shared dreams and the legacy of Gandalf's spirit.",
                discussedCount: 0,
            },
        ],
    },
    {
        ID: "3",
        type: "past",
        name: "When we discussed the future",
        creationDate: 1684699458488,
        memories: [
            {
                ID: "0",
                type: "text",
                description:
                    "On a beautiful day, under the warmth of the sun, I had a poignant conversation with Gandalf about our dreams for retirement. As we sat outside, surrounded by nature's splendor, a sense of tranquility enveloped us. We spoke of the adventures we longed to embark upon once our days of duty had come to an end. Gandalf, with his wise eyes gleaming, shared tales of distant lands he wished to explore, and the knowledge he yearned to acquire during his twilight years. We laughed and exchanged stories, weaving visions of a peaceful existence filled with discovery and reflection. Little did we know that fate would be unkind, for Gandalf's journey would end before he reached the retirement he so deserved. As I look back on that conversation, a bittersweet nostalgia washes over me, reminding me of the beauty we once shared and the dreams that were left unfulfilled. Though he never made it to retirement, I find solace in knowing that Gandalf's spirit and wisdom continue to inspire us, even in his absence.",
                discussedCount: 0,
            },
            {
                ID: "1",
                type: "picture",
                media: "https://i.pinimg.com/originals/03/53/e4/0353e4a8249f512e17d3f56cfaa04c1a.jpg",
                discussedCount: 0,
            },
        ],
    },
    {
        ID: "2",
        type: "present",
        name: "Talked about the fight with Balrog",
        creationDate: 1684631031916,
        memories: [
            {
                ID: "0",
                type: "picture",
                media: "https://i.pinimg.com/originals/c6/78/8b/c6788b547ff897c6773e86622e3b092d.jpg",
                discussedCount: 0,
            },
            {
                ID: "1",
                type: "text",
                description:
                    "With a heavy heart, I found solace in sharing my thoughts with Emily about Gandalf's fateful encounter with the Balrog. The conversation took on a somber tone as we reflected upon the immense sacrifice made by our beloved wizard. We spoke of Gandalf's unwavering courage and determination, his final stand resonating deeply within us. The memory of his valiant words, 'You shall not pass,' carried a weight of both defiance and farewell. Our voices filled with a mix of admiration and sorrow as we acknowledged that this legendary battle marked Gandalf's ultimate sacrifice, his passing from our world. Together, we found comfort in cherishing the indomitable spirit and the profound impact he had left behind, forever honoring his memory. ",
                discussedCount: 0,
            },
        ],
    },
    {
        ID: "1",
        name: "You shall not pass",
        type: "past",
        creationDate: 1684631031916,
        memories: [
            {
                ID: "0",
                type: "picture",
                media: "https://cdn.vox-cdn.com/thumbor/bLcMIc6r1murhxrw90Q_nkg4z_k=/0x0:3831x1587/1200x675/filters:focal(1835x397:2447x1009)/cdn.vox-cdn.com/uploads/chorus_image/image/70123899/4k_fellowship_movie_screencaps.com_23524.0.jpg",

                discussedCount: 0,
                date: 1008716400000,
            },
            {
                ID: "1",
                type: "text",
                description:
                    "In a climactic moment that shall forever be etched in the annals of Middle-earth's history, Gandalf, with his staff held high, stood steadfast in the face of an overwhelming foe. Darkness swirled around him as a formidable Balrog emerged from the depths of Khazad-dûm. With unyielding resolve, Gandalf unleashed his power, his voice resonating with unwavering determination as he bellowed, 'You shall not pass!' The words echoed through the chamber, reverberating with a power that shook the very foundations of the earth. A tempest of fire clashed against the stalwart wizard, yet he stood firm, his will unbreakable. In that pivotal moment, Gandalf's defiance became a testament to his unwavering commitment to protect his companions and the cause of righteousness. Through his resolute stand, he exemplified the true essence of a hero, a guardian who would not yield an inch to the forces of darkness. His valiant words and unwavering stance shall forever be etched in our hearts, a reminder of the extraordinary strength that lies within us all when faced with insurmountable odds.",
                discussedCount: 0,
                date: 1008716400000,
            },
            {
                ID: "2",
                type: "picture",
                media: "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/10/What-does-the-balrog-mean-for-Khazad-dums-future-Feature.jpg",
                description: "Balrog",
                discussedCount: 0,
            },
            {
                ID: "3",
                type: "song",
                media: "3nfmgykmdHpX0M5dSVnMnX",
                discussedCount: 0,
            },
        ],
    },
    {
        ID: "0",
        name: "Profile",
        type: "past",
        creationDate: 1684609312881,
        memories: [
            {
                ID: "0",
                type: "picture",
                media: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/10/Gandalf-Name-Feature-Image.jpg",
                discussedCount: 0,
            },
            {
                ID: "1",
                type: "text",
                discussedCount: 0,
                description:
                    "In the wake of Gandalf's passing, a profound sense of loss befalls us all. My dear brother, a beacon of wisdom and unwavering strength, has departed from this realm, leaving behind a legacy that will endure throughout the ages. Gandalf's indomitable spirit and selfless dedication to the cause of good have left an indelible mark on our hearts and in the annals of history. Though we mourn his absence, let us also celebrate his remarkable life and the countless lives he touched, for his memory shall forever guide us towards the light in our darkest moments. Farewell, dear brother, may your spirit find eternal peace in the realms beyond.",
            },
        ],
    },
];
export const fakeData: ISerializedApp = {
    name: "Tom Hoesel",
    email: "tom@hoesel.tom",
    profiles: [
        {
            ID: "0",
            type: "bereaved",
            deceased: "Gandalf",
            sections,
        },
        {
            ID: "1",
            type: "buddy",
            forAccount: {
                name: "Tom Hoesel",
                email: "tom@hoesel.tom",
            },
            forDeceased: "Gandalf",
            sections,
            receivedTips: {},
        },
    ],
};
