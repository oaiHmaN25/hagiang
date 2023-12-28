import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog Details Page - Solid SaaS Boilerplate",
  description: "This is Blog details page for Solid Pro",
  // other metadata
};

const SingleBlogPage = async () => {
  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="md:w-1/2 lg:w-[32%]">
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-3.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <form
                  action="https://formbold.com/s/unique_form_id"
                  method="POST"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Here..."
                      className="w-full rounded-lg border border-stroke px-6 py-4 shadow-solid-12 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />

                    <button
                      className="absolute right-0 top-0 p-5"
                      aria-label="search-icon"
                    >
                      <svg
                        className="fill-black transition-all duration-300 hover:fill-primary dark:fill-white dark:hover:fill-primary"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
                  Categories
                </h4>

                <ul>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Blog</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Events</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Grids</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">News</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Rounded</a>
                  </li>
                </ul>
              </div>

              <RelatedPost />
            </div>

            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                <div className="mb-10 w-full overflow-hidden ">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image
                      src={"/images/blog/tuyenquang.jpg"}
                      alt="Kobe Steel plant that supplied"
                      fill
                      className="rounded-md object-cover object-center"
                    />
                  </div>
                </div>

                <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                  Tuyên Quang
                </h2>

                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                  <li>
                    <span className="text-black dark:text-white">Author: </span>{" "}
                    Đỗ Mai Hương
                  </li>
                  <li>
                    <span className="text-black dark:text-white">
                      Published On: Dec 28, 2023
                    </span>{" "}
                  </li>
                  <li>
                    <span className="text-black dark:text-white">
                      Category :
                    </span>
                     Places
                  </li>
                </ul>

                <div className="blog-details">
                  <p>
                    Tuyên Quang là một tỉnh miền núi nằm ở phía Bắc Việt Nam, cách thủ đô Hà Nội khoảng 130km. Tuyên Quang có diện tích tự nhiên 5.863,7 km2, dân số hơn 800.000 người. Tuyên Quang là một tỉnh có bề dày lịch sử văn hóa lâu đời, là nơi diễn ra nhiều sự kiện quan trọng trong lịch sử đấu tranh giải phóng dân tộc của Việt Nam.
                  </p>

                  <p>
                     Tuyên Quang - Thành phố bên dòng Lô lịch sử, nơi có 59 điểm du lịch lịch sử, văn hoá và duy trì tổ chức nhiều lễ hội văn hoá độc đáo hàng năm như: Lễ hội đua thuyền, lễ hội chùa Hương Nghiêm, lễ hội đền Hạ - đền Thượng - đền Ỷ La, lễ rước cánh ấn đền Trần và lễ hội đường phố. Trong đó có nhiều điểm di tích đền, chùa đã trở thành thế mạnh trong việc phát triển du lịch văn hóa tâm linh của thành phố, hàng năm thu hút một lượng lớn khách du lịch. Nơi đây còn lưu dấu ấn bàn tay tài hoa của con người trên những di tích, kiến trúc nghệ thuật, đình, chùa, đền, miếu... trong đó có nhiều di tích được xếp hạng cấp Quốc gia như: Thành nhà Mạc, đền Hạ, đền Thượng, đền Ỷ La…
                  </p>

                  <div className="flex flex-wrap gap-5">
                    <Image
                      src={"/images/blog/thanh-pho.jpg"}
                      width={400}
                      height={200}
                      alt="image"
                    />
                    <Image
                      src={"/images/blog/anhtq.jpg"}
                      width={400}
                      height={200}
                      alt="image"
                    />
                  </div>

                  <h3 className="pt-8">
                    Lễ hội, sự kiện thu hút khách tham quan
                  </h3>
                  <Image
                      src={"/images/blog/le-hoi-thanh-tuyen-1_637017998990869769.jpg"}
                      width={800}
                      height={200}
                      alt="image"
                    />
                  <p>
                    Lễ hội Thành Tuyên là lễ hội lớn nhất của tỉnh Tuyên Quang, được tổ chức vào dịp 30/4 - 1/5 hằng năm. Lễ hội có nhiều hoạt động văn hóa, thể thao, vui chơi giải trí hấp dẫn như: đua thuyền trên sông Lô, biểu diễn nghệ thuật, trò chơi dân gian,...
                  </p>
                  <Image
                      src={"/images/blog/2958_nhayluapathen.jpg"}
                      width={800}
                      height={200}
                      alt="image"
                    />
                  <p>
                    Lễ hội nhảy lửa là một lễ hội truyền thống của người Dao ở Tuyên Quang, được tổ chức vào dịp đầu năm mới. Lễ hội mang ý nghĩa cầu cho một năm mưa thuận gió hòa, mùa màng bội thu.
                  </p>
                  <Image
                      src={"/images/blog/choitrau.jpg"}
                      width={800}
                      height={200}
                      alt="image"
                    />
                  <p>
                    Lễ hội chọi trâu là một lễ hội đặc sắc của người Tày ở Tuyên Quang, được tổ chức vào dịp đầu xuân. Lễ hội thu hút đông đảo người dân và du khách tham gia.
                  </p>
                  <Image
                      src={"/images/blog/hoichothuongmai.jpg"}
                      width={800}
                      height={200}
                      alt="image"
                    />
                  <p>
                    Hội chợ thương mại, du lịch quốc tế Tuyên Quang được tổ chức định kỳ 2 năm một lần, là một cơ hội giao lưu, hợp tác kinh tế, thương mại, du lịch giữa Tuyên Quang với các tỉnh, thành phố trong nước và quốc tế.
                  </p>
                   <h3 className="pt-8">
                    Khu di tích Tân Trào
                  </h3>
                  <Image
                      src={"/images/blog/tantrao.jpg"}
                      width={800}
                      height={200}
                      alt="image"
                  />
                  <h5 className="pt-8">
                    Giới thiệu chung
                  </h5>
                  <p>Khu Di tích quốc gia đặc biệt Tân Trào (xã Tân Trào, huyện Sơn Dương, tỉnh Tuyên Quang) được biết đến như là “Thủ đô Khu giải phóng”, “Thủ đô kháng chiến” khi được Bác Hồ và Trung ương Đảng chọn làm căn cứ cách mạng để chuẩn bị cho cuộc Tổng khởi nghĩa Tháng Tám năm 1945 và kháng chiến chống thực dân Pháp xâm lược. Khu di tích lịch sử Tân Trào hiện tại có tới 183 di tích gắn liền với hoạt động của Bác Hồ cùng các cơ quan Trung ương trong tiền khởi nghĩa và kháng chiến chống thực dân Pháp. Nhiều năm qua, nơi đây trở thành một trong những điểm đến hấp dẫn du khách</p>
                  <h5 className="pt-8">
                    Vị trí
                  </h5>
                  <p>
                    Khu di tích lịch sử Tân Trào nằm ở phía Đông Nam của tỉnh Tuyên Quang, trải dài trên địa bàn 12 xã của hai huyện Sơn Dương và Yên Sơn với với diện tích khoảng 6.633 ha. Cách thành phố Tuyên Quang khoảng 37km (52p di chuyển ô tô).
                  </p>
                  <h5 className="pt-8">
                    Lịch sử
                  </h5>
                  <p>
                    Khu di tích lịch sử Tân Trào nằm ở phía Đông Nam của tỉnh Tuyên Quang, trải dài trên địa bàn 12 xã của hai huyện Sơn Dương và Yên Sơn với với diện tích khoảng 6.633 ha. Cách thành phố Tuyên Quang khoảng 37km (52p di chuyển ô tô).
                  </p>
                  <h5 className="pt-8">
                    Vị trí
                  </h5>
                  <p>
                    - Tân Trào là vùng đất có lịch sử lâu đời, gắn liền với cuộc đấu tranh chống giặc ngoại xâm của dân tộc Việt Nam.
                  </p>
                  <p>
                    - Trong thời kỳ tiền khởi nghĩa, Tân Trào là nơi hoạt động của các cơ quan Trung ương Đảng và Chính phủ, là căn cứ địa cách mạng của khu giải phóng Việt Bắc.
                  </p>
                  <p>
                    - Tháng 5 năm 1945, Chủ tịch Hồ Chí Minh từ Pắc Bó về Tân Trào để trực tiếp lãnh đạo cuộc Cách mạng tháng Tám.
                  </p>
                  <p>
                    - Tại Tân Trào, Chủ tịch Hồ Chí Minh đã chủ trì Hội nghị toàn quốc của Đảng Cộng sản Đông Dương (nay là Đảng Cộng sản Việt Nam) lần thứ VIII (từ ngày 10 đến 19 tháng 5 năm 1945) và Hội nghị Quốc dân (từ ngày 16 đến 18 tháng 8 năm 1945).
                  </p>
                   <p>
                    - Tại Hội nghị Quốc dân, Chủ tịch Hồ Chí Minh đã đọc Bản tuyên ngôn độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa
                  </p>
                  <h5 className="pt-8">
                    Công nhận
                  </h5>
                  <p>
                    Với những giá trị lịch sử, văn hóa, khoa học đặc biệt của khu di tích, Thủ tướng Chính phủ đã quyết định xếp hạng Khu di tích lịch sử Tân Trào (huyện Sơn Dương và huyện Yên Sơn, tỉnh Tuyên Quang) là di tích quốc gia đặc biệt (Quyết định số 548/QĐ-TTg, ngày 10/5/2012).
                  </p>

                </div>

                <SharePost />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;
