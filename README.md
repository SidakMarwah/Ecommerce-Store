# Ecommerce Store

![Ecommerce Store Screenshot](/public/assets/store.png)

This project is a modern eCommerce store built to deliver a seamless shopping experience for users. It integrates with the **Ecommerce Admin Panel** to fetch product details and other information directly from the database, ensuring real-time updates and efficient management.

This project leverages modern web technologies, including **TypeScript**, **Next.js**, **Tailwind CSS**, and **ShadCN UI**, to provide a fast, scalable, and beautiful user experience.

---

## Technologies Used

- **Framework**: ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) [Next.js](https://nextjs.org/) with TypeScript
- **Styling**: ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) [Tailwind CSS](https://tailwindcss.com/) + [Tailwind Merge](https://github.com/dcastil/tailwind-merge) for utility merging
- **UI Components**: [ShadCN UI](https://ui.shadcn.dev/) built on top of Radix UI
- **Database**: ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) [MongoDB](https://www.mongodb.com/)
- **Carousel**: [Embla Carousel](https://www.embla-carousel.com/) with auto-scroll
- **Other Tools**:
  - ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) [Axios](https://axios-http.com/) for API calls
  - ![Radix UI](https://img.shields.io/badge/Radix-UI%20Components-009EC2?style=for-the-badge&logo=radix&logoColor=white) [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
  - ![Lucide](https://img.shields.io/badge/Lucide-Icons-83C8FF?style=for-the-badge&logo=lucide&logoColor=white) [Lucide](https://lucide.dev/) for beautiful icons

---

## Prerequisites

To run this project locally, make sure you have the following environment variable set:

```env
MONGODB_URI=<your-mongodb-connection-string>
```

The store fetches product and category data from the **Ecommerce Admin Panel**, which is hosted at:

[https://ecommerce-admin-sidak.vercel.app/](https://ecommerce-admin-sidak.vercel.app/)

And Git repsitory for the **Ecommerce Admin Panel**, is available at:

[https://github.com/SidakMarwah/Ecommerce-Admin](https://github.com/SidakMarwah/Ecommerce-Admin)

Ensure that the Admin Panel is properly configured and accessible.

---

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/SidakMarwah/Ecommerce-Store.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ecommerce-store
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root of the project and add the required environment variable:

   ```env
   MONGODB_URI=<your-mongodb-connection-string>
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the eCommerce store in action.

---

## Features

- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Dynamic Product Listing**: Fetches product data in real-time from the Ecommerce Admin Panel.
- **Category Management**: Products are organized into categories for seamless navigation.
- **ShadCN UI**: Provides consistent, accessible, and customizable components.
- **Carousel Integration**: Showcase featured products with smooth scrolling.
- **Dark Mode**: User-friendly light and dark mode support via `next-themes`.

---

## Author

This project was developed by **Sidak Marwah**.

- Email: [sidakmarwah@gmail.com](mailto:sidakmarwah@gmail.com)
- GitHub: [SidakMarwah](https://github.com/SidakMarwah)
- LinkedIn: [Sidak Marwah](https://www.linkedin.com/in/sidakmarwah/)
- Instagram: [sidakmarwah](https://www.instagram.com/sidakmarwah/)
- X (formerly Twitter): [@SidakMarwah](https://x.com/SidakMarwah)

[![GitHub](https://img.shields.io/badge/GitHub-Visit_Profile-black?style=for-the-badge&logo=github)](https://github.com/SidakMarwah)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sidakmarwah/)
[![Instagram](https://img.shields.io/badge/Instagram-Follow-orange?style=for-the-badge&logo=instagram)](https://www.instagram.com/sidakmarwah/)
[![X](https://img.shields.io/badge/X-Follow-blue?style=for-the-badge&logo=x)](https://x.com/SidakMarwah)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contribution

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

Happy shopping! 🛒
