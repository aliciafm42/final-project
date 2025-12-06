import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Student Profiles",
  description: "A list of student profiles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          <main>
            <div className="section">
              <div className="container">{children}</div>
            </div>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
