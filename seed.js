import mongoose from "mongoose";
import dotenv from "dotenv";
import blogPostModel from "./src/models/blogModel.js"; // adjust if your path is different

dotenv.config();

const blogPosts = [
  {
    title: "Build a Python Web Scraper in Under 30 Minutes",
    description: "Learn to create a Python web scraper quickly to automate data extraction.",
    img: {
      public_id: "blog-images/python-web-scraper",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812242/aW1hZ2VfdHN6emZu/drilldown",
    },
    content: `<p>Web scraping is an invaluable skill for automating the extraction of data from websites. Whether you want to collect product prices, gather research information, or monitor news updates, a web scraper can save you hours of manual work. Python is one of the best languages for this task because of its simplicity and powerful libraries. In this tutorial, you'll learn how to build a Python web scraper in under 30 minutes using the Requests library for sending HTTP requests and BeautifulSoup for parsing HTML content. The process involves sending a request to a webpage, fetching its HTML, and extracting specific information like text, links, or images. We’ll also cover handling pagination to scrape data from multiple pages and respecting website rules by adhering to robots.txt files. Additionally, this guide touches on ethical scraping practices and how to avoid getting blocked by websites. By the end of this tutorial, you will be equipped with a foundational scraper that you can customize to suit your own data gathering needs. This quick yet comprehensive approach makes it easy for beginners and intermediate programmers to dive into web scraping confidently</p>`,
    author: "Michael Lee",
    userId: "user127",
    category: "Tutorial",
    url: "build-a-python-web-scraper-in-under-30-minutes",
    featured: false,
    approved: true,
  },
  {
    title: "AWS vs Azure vs Google Cloud: A Comprehensive Cloud Platform",
    description: "Compare the top cloud providers to decide which platform suits your business.",
    img: {
      public_id: "blog-images/aws-vs-azure",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812285/aW1hZ2VfcDRpemtl/drilldown",
    },
    content: `<p>Choosing the right cloud service provider is a critical decision for any business aiming to leverage cloud computing. Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP) are the top contenders, each with its unique strengths and capabilities. AWS leads with the broadest range of services and a mature global infrastructure. Azure integrates seamlessly with Microsoft products, making it a natural choice for enterprises already invested in Microsoft ecosystems. Google Cloud excels in machine learning, data analytics, and developer-friendly tools. This comprehensive guide compares the three providers across various dimensions including compute power, storage solutions, pricing models, security features, and ease of use. We’ll analyze scenarios such as hosting websites, running big data projects, or deploying containerized applications to help you decide which platform aligns best with your business goals. Additionally, the article delves into support options and ecosystem integrations. Whether you’re a startup, a mid-sized company, or an enterprise, understanding the differences between AWS, Azure, and Google Cloud is vital for making informed, strategic decisions in your cloud journey.</p>`,
    author: "Sarah Williams",
    userId: "user128",
    category: "Tech",
    url: "aws-vs-azure-vs-google-cloud-comprehensive",
    featured: false,
    approved: true,
  },
  {
    title: "Understanding the Context API in React.js: A Comprehensive Guide for 2024",
    description: "Learn how React’s Context API helps manage global state with easy-to-use tools.",
    img: {
      public_id: "blog-images/react-context-api",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812666/aW1hZ2VfY3B0c2xi/drilldown",
    },
    content: `<p>React’s Context API provides an elegant solution to manage and share global state across your application without the cumbersome prop drilling that often complicates component hierarchies. This comprehensive guide introduces the core concepts of Context in React, including how to create, provide, and consume context data effectively. You’ll learn how to integrate Context with React hooks like useContext and how to build scalable state management solutions without the overhead of third-party libraries such as Redux. The guide also discusses common use cases like theming, user authentication, and language localization where Context shines. Performance considerations are addressed, including how to minimize unnecessary re-renders by properly structuring your providers and consumers. Additionally, best practices, tips on testing components that use Context, and how to handle asynchronous data flows with Context are included. By mastering the Context API, you’ll be able to build clean, maintainable React applications that scale efficiently while keeping your codebase simple and approachable</p>`,
    author: "Oliver Martinez",
    userId: "user139",
    category: "Tutorial",
    url: "understanding-context-api-in-reactjs-2024",
    featured: false,
    approved: true,
  },
  {
    title: "Unique Full‑stack Project Ideas to Boost Your Portfolio in 2024",
    description: "Get inspired with innovative full-stack project ideas that can impress employers.",
    img: {
      public_id: "blog-images/fullstack-project-ideas",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812666/aW1hZ2VfY3B0c2xi/drilldown",
    },
    content: `<p>Having a robust portfolio is essential for developers to showcase their skills and stand out in the competitive job market. This article explores unique full-stack project ideas designed to demonstrate a wide range of technical abilities and creativity in 2024. From building real-time chat applications with WebSocket integrations to creating e-commerce sites featuring advanced filtering and payment gateways, these project ideas incorporate both front-end and back-end technologies. Each idea includes suggestions on which frameworks, libraries, and databases to use, such as React, Node.js, MongoDB, or GraphQL. We also cover deployment strategies using platforms like Vercel, Netlify, or AWS to showcase your projects live. Beyond technical implementation, the article emphasizes the importance of writing clean code, implementing proper authentication and security measures, and incorporating responsive design. These projects not only help sharpen your coding skills but also demonstrate problem-solving abilities and understanding of modern development workflows. Whether you're a beginner or looking to expand your portfolio with innovative projects, this guide inspires practical ideas that impress recruiters and clients alike.</p>`,
    author: "Sophia Lopez",
    userId: "user142",
    category: "Tech",
    url: "unique-fullstack-project-ideas-2024",
    featured: false,
    approved: true,
  },
  {
    title: "Robo Soccer: The Future of Sports and Robotics Integration",
    description: "Explore how robotics and AI are revolutionizing the world of sports with Robo Soccer.",
    img: {
      public_id: "blog-images/robo-soccer",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750811839/aW1hZ2VfaXEza2o5/drilldown",
    },
    content: `<p>Robo Soccer is an innovative blend of sports and robotics, where teams of autonomous robots compete in soccer matches controlled by artificial intelligence algorithms. This futuristic sport is pushing the boundaries of robotics engineering, combining fields such as computer vision, machine learning, and multi-agent coordination. Robo Soccer serves as a real-world testbed for developing sophisticated autonomous systems capable of dynamic decision-making, real-time obstacle avoidance, and cooperative teamwork. The sport has applications beyond entertainment — including research in AI, robotics education, and developing technologies that could be applied to manufacturing and autonomous vehicles. This article dives deep into the history and technological foundations of Robo Soccer, examining how sensors, actuators, and algorithms work together to create competitive robotic players. We discuss ongoing challenges like improving robot mobility, refining AI strategies, and creating immersive spectator experiences. As Robo Soccer continues to evolve, it holds promise for advancing both the sports and robotics industries in exciting new ways.</p>`,
    author: "John Doe",
    userId: "user123",
    category: "Tech",
    url: "robo-soccer-future-of-sports-and-robotics-integration",
    featured: true,
    approved: true,
  },
  {
    title: "OnePlus Ace 3 Pro: A Game‑Changer in the Smartphone Arena",
    description: "An in-depth review of the OnePlus Ace 3 Pro, highlighting its innovation.",
    img: {
      public_id: "blog-images/oneplus-ace-3-pro",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812310/aW1hZ2VfZXVtemVr/drilldown",
    },
    content: `<p>The OnePlus Ace 3 Pro has emerged as a strong contender in the 2024 smartphone market by delivering flagship-level performance at a surprisingly affordable price. This device features a vibrant AMOLED display with a high refresh rate, ensuring smooth scrolling and immersive visuals. Powered by the latest Snapdragon chipset, it handles multitasking and gaming with ease. The camera setup includes advanced sensors and AI-powered features to capture stunning photos and videos under various lighting conditions. Battery capacity and fast-charging technology allow users to stay powered throughout the day without long wait times. The phone runs OxygenOS, known for its clean, user-friendly interface and customizable options. This review covers the design aesthetics, hardware specs, software experience, and pricing to evaluate why the OnePlus Ace 3 Pro is considered a game-changer. Whether you prioritize speed, photography, or value, this smartphone offers a well-rounded package for tech enthusiasts and everyday users alike.</p>`,
    author: "Jane Smith",
    userId: "user124",
    category: "Shopping",
    url: "oneplus-ace-3-pro-game-changer",
    featured: false,
    approved: true,
  },
  {
    title: "How to Build a Personal Portfolio Website from Scratch",
    description: "Step-by-step guide to creating a stunning portfolio website.",
    img: {
      public_id: "blog-images/portfolio-website",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812164/aW1hZ2VfZDV1dmdn/drilldown",
    },
    content: `<p>A personal portfolio website is essential for developers, designers, and freelancers who want to showcase their skills, projects, and professional story online. This step-by-step guide walks you through creating a portfolio website from scratch using core web technologies: HTML, CSS, and JavaScript. You’ll learn how to design a clean, responsive layout that works seamlessly across devices, ensuring potential employers and clients can view your work on any screen. The guide also covers organizing your projects into categories, writing engaging about sections, and integrating contact forms with backend services. We explore how to optimize for SEO to improve your site’s visibility and discuss deploying your portfolio using platforms like Netlify or GitHub Pages for free hosting. Beyond coding, the article offers tips on crafting compelling content and visual design to make your portfolio memorable. Building a personalized portfolio website not only demonstrates your technical skills but also reflects your creativity and professionalism, helping you stand out in the job market.</p>`,
    author: "Emily Clark",
    userId: "user125",
    category: "Tutorial",
    url: "how-to-build-a-personal-portfolio-website-from-scratch",
    featured: false,
    approved: true,
  },
  {
    title: "OnePlus 12R: Full Specs, Price, and Release Date | 2024 Flagship Killer",
    description: "Everything you need to know about the OnePlus 12R.",
    img: {
      public_id: "blog-images/oneplus-12r",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812310/aW1hZ2VfZXVtemVr/drilldown",
    },
    content: `<p>The OnePlus 12R has generated buzz as a potential flagship killer for 2024, offering high-end specifications without the typical flagship price tag. This smartphone boasts a cutting-edge Snapdragon processor, a stunning OLED display with up to 120Hz refresh rate, and a multi-camera system capable of professional-grade photography and videography. With fast wired and wireless charging, it ensures minimal downtime. The device runs OxygenOS, delivering a smooth, customizable user experience. In this article, we provide an in-depth look at rumored and confirmed specs, pricing details, and the expected release timeline. We also compare it against competitors like Samsung’s Galaxy series and Apple’s iPhones, analyzing where the OnePlus 12R stands out and where it might fall short. For tech enthusiasts and budget-conscious buyers, the 12R promises to be a compelling option in the premium smartphone market.</p>`,
    author: "David Kim",
    userId: "user129",
    category: "Shopping",
    url: "oneplus-12r-full-specs-price-release-date-2024",
    featured: false,
    approved: true,
  },
  {
    title: "Best Smart Home Devices to Buy in 2024",
    description: "Automate your home with the best smart devices.",
    img: {
      public_id: "blog-images/smart-home-devices",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812573/aW1hZ2Vfc3Ficm4x/drilldown",
    },
    content: `<p>Smart home devices have become increasingly accessible and affordable, allowing homeowners to automate tasks, enhance security, and improve energy efficiency. This guide reviews the best smart home devices to buy in 2024, including smart speakers like Amazon Echo and Google Nest, smart thermostats such as the Nest Learning Thermostat, and security devices like smart locks and cameras. We evaluate devices based on ease of setup, compatibility with major ecosystems (Alexa, Google Assistant, Apple HomeKit), and their unique features. Whether you’re looking to control lighting remotely, monitor your home while away, or optimize energy usage, this article helps you select products that fit your lifestyle and budget. We also discuss privacy considerations and how to secure your smart home network. By integrating these devices, you can create a connected, convenient, and safer living environment.</p>`,
    author: "Emma Johnson",
    userId: "user138",
    category: "Shopping",
    url: "best-smart-home-devices-to-buy-2024",
    featured: false,
    approved: true,
  },
  {
    title: "Kubernetes: Ultimate Guide to Container Orchestration and Best Practices",
    description: "A detailed guide on Kubernetes and orchestration.",
    img: {
      public_id: "blog-images/kubernetes-guide",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812749/aW1hZ2VfZnV1YWVr/drilldown",
    },
    content: `<p>Kubernetes has revolutionized the way applications are deployed and managed in the cloud by automating container orchestration. This ultimate guide explains Kubernetes architecture, including pods, deployments, services, and ingress controllers. We cover core concepts like scaling, load balancing, rolling updates, and self-healing to ensure your applications remain resilient and available. The article also discusses best practices for setting up clusters, securing your infrastructure with role-based access control (RBAC), and monitoring system health. We provide practical tips on deploying applications using Helm charts and managing stateful workloads. Whether you’re new to containers or an experienced DevOps engineer, understanding Kubernetes is essential for modern cloud-native development. This guide equips you with the knowledge to build scalable, manageable, and robust applications on Kubernetes.</p>`,
    author: "Ethan Walker",
    userId: "user141",
    category: "Tutorial",
    url: "kubernetes-ultimate-guide-container-orchestration",
    featured: false,
    approved: true,
  },
  {
    title: "Common React Errors and How to Fix Them",
    description: "Identify and resolve common React.js errors.",
    img: {
      public_id: "blog-images/react-errors",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812193/aW1hZ2VfYzRtNnpq/drilldown",
    },
    content: `<p>React developers, especially beginners, often face a variety of errors that can disrupt app development and user experience. This article covers some of the most common React errors, including “setState” misuse, missing keys in lists, invalid hook calls, and state mutation issues. Each error is explained with example code snippets and clear instructions on how to diagnose and fix them. We also provide tips on using React Developer Tools for debugging and strategies to prevent these issues through best coding practices. The guide includes how to handle asynchronous updates and avoid infinite loops in effects. By mastering these fixes, you’ll improve the reliability and performance of your React applications, ultimately creating smoother experiences for your users and making your codebase easier to maintain.</p>`,
    author: "Alex Johnson",
    userId: "user126",
    category: "Tutorial",
    url: "common-react-errors-and-how-to-fix-them",
    featured: false,
    approved: true,
  },
  {
    title: "Redmi Note 14 Full Specs and Review: Best Budget 5G Smartphone for 2024",
    description: "Discover why Redmi Note 14 is the best budget 5G phone in 2024.",
    img: {
      public_id: "blog-images/redmi-note-14",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812378/aW1hZ2VfbXlpZmJn/drilldown",
    },
    content: `<p>The Redmi Note 14 continues Xiaomi’s legacy of delivering solid, budget-friendly smartphones with 5G capabilities. This phone offers a bright IPS LCD display, a capable mid-range MediaTek or Snapdragon chipset, and a large battery with fast charging support. The camera system, while not flagship-level, performs well in daylight and offers multiple modes like portrait and night photography. MIUI software adds useful features and customization options. In this detailed review, we evaluate the phone’s build quality, screen performance, gaming capabilities, and battery endurance. Compared to competitors in the budget segment, the Redmi Note 14 stands out for its balance between price and features, making it an excellent choice for users looking for 5G connectivity without a hefty price tag.</p>`,
    author: "Jason Green",
    userId: "user131",
    category: "Shopping",
    url: "redmi-note-14-full-specs-review-budget-5g-2024",
    featured: false,
    approved: true,
  },
  {
    title: "Top VPN Deals to Protect Your Online Privacy in 2024",
    description: "Protect your data and browse safely with top VPNs.",
    img: {
      public_id: "blog-images/top-vpn-deals",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812494/aW1hZ2VfbWo3Mm9t/drilldown",
    },
    content: `<p>With rising cyber threats and increasing data privacy concerns, VPNs have become essential tools for secure internet usage. This article highlights the top VPN deals available in 2024, evaluating providers based on speed, encryption standards, server locations, device compatibility, and customer support. We explain how VPNs protect your online identity by masking your IP address and encrypting your internet traffic, helping you bypass geo-restrictions and censorship. The guide also discusses important features like kill switches, no-log policies, and multi-device support. Whether you’re streaming content, working remotely, or browsing safely on public Wi-Fi, these VPN deals offer affordable options to enhance your online security. Learn how to choose the right VPN provider tailored to your needs and budget.</p>`,
    author: "Sophia Wilson",
    userId: "user134",
    category: "Shopping",
    url: "top-vpn-deals-to-protect-your-online-privacy-2024",
    featured: false,
    approved: true,
  },
  {
    title: "Top Smartwatches You Can Buy in 2024",
    description: "From fitness tracking to notifications, discover top smartwatches.",
    img: {
      public_id: "blog-images/top-smartwatches",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812542/aW1hZ2VfY2FpaG9v/drilldown",
    },
    content: `<p>Smartwatches have transformed from mere timekeepers to comprehensive health and productivity devices. This guide reviews the best smartwatches available in 2024, covering budget models and premium options. Features examined include heart rate and blood oxygen monitoring, GPS tracking, workout modes, battery life, and integration with smartphones for notifications and calls. We discuss the ecosystem compatibility with Android and iOS devices and highlight innovative technologies like ECG sensors and sleep tracking. Whether you’re an athlete wanting detailed fitness metrics or a professional seeking smartwatch convenience, this article helps you find the right watch to fit your lifestyle and budget. We also touch on design, durability, and water resistance to ensure your smartwatch suits your daily activities.</p>`,
    author: "Liam Davis",
    userId: "user135",
    category: "Shopping",
    url: "top-smartwatches-you-can-buy-2024",
    featured: false,
    approved: true,
  },
  {
    title: "Optimizing the Speed of Reactjs Applications: Best Practices and Tips",
    description: "Boost your React app's performance with expert techniques.",
    img: {
      public_id: "blog-images/react-performance",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812344/aW1hZ2VfamoxamVp/drilldown",
    },
    content: `<p>Performance optimization is crucial for React applications to ensure fast load times and smooth user interactions. This article explores best practices such as memoizing components with React.memo, using useCallback and useMemo hooks to prevent unnecessary re-renders, and implementing code splitting to load JavaScript bundles on demand. Lazy loading images and components can further speed up initial page loads. We discuss profiling tools like React Profiler and Chrome DevTools to identify bottlenecks. Additionally, strategies for efficient state management and avoiding expensive computations inside render functions are covered. By following these tips, developers can create highly responsive React apps that scale efficiently, improve SEO, and provide a better user experience..</p>`,
    author: "Laura Martinez",
    userId: "user130",
    category: "Tutorial",
    url: "optimizing-the-speed-of-reactjs-applications",
    featured: false,
    approved: true,
  },
  {
    title: "OPPO A60 5G Price and Specifications – Everything You Need to Know",
    description: "An overview of OPPO A60 5G's price, specs, and features.",
    img: {
      public_id: "blog-images/oppo-a60-5g",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812441/aW1hZ2VfbGVsbm96/drilldown",
    },
    content: `<p>The OPPO A60 5G is an affordable smartphone that combines modern 5G connectivity with solid performance and user-friendly features. This overview covers the phone’s hardware specifications, including a sizable display, decent processor for everyday tasks, and a battery capable of lasting a full day on moderate use. The camera system supports multiple shooting modes and delivers good results under optimal lighting. The phone runs ColorOS, OPPO’s custom skin on Android, offering customization and helpful tools. We compare the A60 5G with competitors in the budget segment, evaluating value for money, build quality, and software experience. For users seeking an entry-level 5G smartphone, the OPPO A60 5G offers a compelling package without a hefty price.</p>`,
    author: "Olivia Turner",
    userId: "user132",
    category: "Shopping",
    url: "oppo-a60-5g-price-specifications",
    featured: false,
    approved: true,
  },
  {
    title: "Best Drones for Beginners and Professionals in 2024",
    description: "A curated list of the best drones for all skill levels.",
    img: {
      public_id: "blog-images/best-drones-2024",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812466/aW1hZ2VfZGVqc2Jj/drilldown",
    },
    content: `<p>Drones have become popular for photography, videography, and recreational flying. This article reviews the best drones available in 2024 suitable for beginners, hobbyists, and professionals. We assess features such as camera quality, flight stability, battery life, ease of use, and advanced capabilities like obstacle avoidance and GPS waypoint navigation. Beginners will find easy-to-fly drones with simplified controls, while professionals can opt for models offering 4K video, extended flight times, and modular designs. Additionally, the article covers regulations and safety tips for responsible drone usage. Whether you’re capturing aerial shots or racing competitively, this guide helps you find the ideal drone to match your experience level and budget.</p>`,
    author: "Ethan Brown",
    userId: "user133",
    category: "Shopping",
    url: "best-drones-for-beginners-and-professionals-2024",
    featured: false,
    approved: true,
  },
  {
    title: "2024’s Best Budget Smartphones: A Buying Guide",
    description: "Here’s a guide to the best budget smartphones in 2024.",
    img: {
      public_id: "blog-images/budget-smartphones-2024",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812378/aW1hZ2VfbXlpZmJn/drilldown",
    },
    content: `<p>Budget smartphones no longer mean sacrificing essential features. This buying guide for 2024 highlights the best budget smartphones that deliver impressive displays, reliable performance, long battery life, and decent cameras at affordable prices. We explore different models from brands like Xiaomi, Realme, and Samsung, comparing specifications such as processors, RAM, storage options, and software updates. The guide also covers the importance of build quality, screen size, and connectivity options like 5G. By understanding what to look for, you can find a phone that meets your everyday needs without breaking the bank. Whether you want a secondary device or a primary phone on a budget, this guide simplifies your buying decision.</p>`,
    author: "Mia Scott",
    userId: "user136",
    category: "Shopping",
    url: "2024-best-budget-smartphones-buying-guide",
    featured: false,
    approved: true,
  },
  {
    title: "A Guide to Buying the Best Laptops for Developers in 2024",
    description: "This guide covers specs, brands, and features developers need.",
    img: {
      public_id: "blog-images/best-laptops-2024",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812601/aW1hZ2VfdmxkZHcw/drilldown",
    },
    content: `<p>Selecting the right laptop is a key decision for developers that affects productivity and comfort. This guide focuses on features important to developers, such as a powerful CPU (preferably multi-core), ample RAM (16GB or more), fast SSD storage, and a high-resolution display for clearer code visibility. Keyboard comfort and battery life are also critical factors for long coding sessions. We compare operating systems—Windows, macOS, and Linux—highlighting their pros and cons for development workflows. Portability and build quality are addressed for developers who work on the go. Additionally, the article discusses accessories like external monitors and docking stations that enhance the development environment. By following this guide, developers can invest in laptops that support efficient and enjoyable coding experiences.</p>`,
    author: "Noah Harris",
    userId: "user137",
    category: "Shopping",
    url: "guide-to-buying-best-laptops-for-developers-2024",
    featured: false,
    approved: true,
  },
  {
    title: "Mastering DevOps: Best Practices for 2024",
    description: "DevOps bridges development and operations. Learn the best practices.",
    img: {
      public_id: "blog-images/devops-best-practices",
      url: "https://res-console.cloudinary.com/techblogcloud/thumbnails/v1/image/upload/v1750812164/aW1hZ2VfZDV1dmdn/drilldown",
    },
    content: `<p>DevOps is a culture and set of practices that improve collaboration between development and operations teams to deliver software faster and more reliably. This article covers best practices for mastering DevOps in 2024, including adopting continuous integration and continuous deployment (CI/CD) pipelines to automate testing and deployment. Infrastructure as code (IaC) tools like Terraform allow teams to manage infrastructure through code, improving consistency and repeatability. Automated monitoring and alerting ensure that issues are detected and resolved quickly. We explore the importance of containerization with Docker and orchestration with Kubernetes for scalable deployments. Building a DevOps culture requires fostering communication, collaboration, and shared responsibility across teams. By embracing these practices, organizations can accelerate software delivery while maintaining high quality and stability.</p>`,
    author: "Ava Thompson",
    userId: "user140",
    category: "Tech",
    url: "mastering-devops-best-practices-2024",
    featured: false,
    approved: true,
  }
];

async function seedDB() {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("❌ MONGODB_URI is undefined. Check your .env file.");
    }

    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    console.log("🧹 Deleting old blog posts...");
    await blogPostModel.deleteMany({});

    console.log(`📝 Inserting ${blogPosts.length} blog posts...`);
    await blogPostModel.insertMany(blogPosts);

    console.log("🎉 Blog posts seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedDB();
