const blogs = [
  {
    id: "11",
    title: "JavaScript Magic: Understanding Promises",
    content: `
      Hey little coders! 🚀✨ Ever wondered how JavaScript does its magic tricks? Today, let's talk about something super cool called "Promises." Imagine you have a magic wand that can make things happen, one after the other. That's what promises do in JavaScript! They help us make our code do amazing things, step by step. It's like having a magical to-do list for our computer! 🌟
      ![JavaScript Promises](https://source.unsplash.com/800x600/?technology)
    `,
    media: [
      "https://source.unsplash.com/800x601/?nature",
      "https://source.unsplash.com/800x602/?people",
    ],
    mediaCount: 2,
    owner: {
      name: "code_wizard_junior",
      uid: "5678",
      avatar: "",
    },
    createdAt: new Date("2023-03-01"),
    updatedAt: new Date("2023-03-02"),
    comments: 25,
  },
  {
    id: "12",
    title: "Fun with Web Buttons: JavaScript is Awesome!",
    content: `
      Hey little developers-in-the-making! 🌈🎉 Today, let's dive into the colorful world of JavaScript and learn about making buttons on the web do fun things! It's like having a remote control for your favorite game. We'll press some buttons, and the web page will react with excitement! 🕹️ Ready for the button-clicking adventure? Let's make the web dance to our tunes! 💃🎸
      ![Interactive Web Buttons](https://source.unsplash.com/800x603/?technology)
    `,
    media: [
      "https://source.unsplash.com/800x604/?abstract",
      "https://source.unsplash.com/800x605/?technology",
    ],
    mediaCount: 2,
    owner: {
      name: "web_explorer_kid",
      uid: "6789",
      avatar: "https://source.unsplash.com/100x101/?portrait",
    },
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-03-06"),
    comments: 30,
  },
];

export default blogs;
