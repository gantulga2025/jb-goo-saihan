const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const legacyVisualMap = {
  "/common/img/main/section01_bgimg01.png": "/assets/img/about/chest_figureUl_img01.jpg",
  "/common/img/main/section01_bgimg02.png": "/assets/img/about/panorama1_img04.jpg",
  "/common/img/main/section01_bgimg03.png": "/assets/img/about/about_figureUl_img02.jpg",
  "/common/img/main/section01_bgimg04.png": "/assets/img/about/chest_figureUl_img03.jpg",
  "/common/img/main/section01_bgimg05.png": "/assets/img/about/medicalteam_art01_doctor_ydy.png",
  "/common/img/main/section01_bgimg06.png": "/assets/img/about/about_figureUl_img06.jpg",
  "/common/img/main/section01_bgimg07.png": "/assets/img/about/about_figureUl_img04.jpg",
  "/common/img/main/section01_bgimg08.png": "/assets/img/about/guide_art01_bg.jpg",
  "/common/img/main/section01_bgimg09.png": "/assets/img/about/panorama3_img01.jpg",
  "/common/img/main/section01_bgimg01_m.png": "/assets/img/about/chest_figureUl_img01.jpg",
};
const asset = (p) => legacyVisualMap[p] || p;
const pageHref = (groupKey, slug) => `/${groupKey}/${slug}.html`;
const clinicName = "JY гоо сайхны мэс заслын эмнэлэг";
const clinicAddress = "서울 강남구 도산대로 509, Gangnam District, 서울, South Korea, 06012";
const clinicPhone = "+82 10-9897-7684";

const groups = [
  {
    key: "lifting",
    title: "Лифтинг",
    href: "/lifting/lifting12.html",
    intro: "Нүүрний хэлбэр, арьсны уян хатан байдал, насжилтын өөрчлөлтийг хамтад нь үнэлж төлөвлөдөг лифтинг програм.",
    pages: [
      ["lifting12", "Лифтинг"],
      ["lifting08", "PCL лифтинг"],
      ["lifting09", "Силуэт лифтинг"],
      ["lifting10", "Минт лифтинг"],
      ["lifting01", "Face V контур"],
      ["lifting02", "Дунд насны Face V контур"],
      ["lifting03", "Жембери лифтинг"],
      ["lifting04", "Power Shurink"],
      ["lifting05", "Их хэмжээний V контур тарилга"],
      ["lifting06", "Heart-line өөх шилжүүлэн суулгах"],
      ["lifting07", "Super Oligio"],
      ["lifting11", "Rejuran healer"],
    ],
  },
  {
    key: "chest",
    title: "Хөх",
    href: "/chest/chest07.html",
    intro: "Биеийн харьцаа, эдийн зузаан, хүссэн хэлбэрт тааруулсан хөхний мэс заслын төлөвлөлт.",
    pages: [
      ["chest07", "Хөхний өөх шилжүүлэн суулгах"],
      ["chest01", "Motiva хөхний мэс засал"],
      ["chest02", "Pulse хөхний мэс засал"],
      ["chest03", "Line-up хөхний мэс засал"],
      ["chest04", "Өөрийн өөхөөр хөх томруулах"],
      ["chest05", "Хөхний дахин мэс засал"],
      ["chest06", "Хөхний дараах арчилгаа"],
    ],
  },
  {
    key: "eye",
    title: "Нүд",
    href: "/eye/eye01.html",
    intro: "Нүдний хэлбэр, зовхины зузаан, булчингийн хүчийг харгалзан байгалийн шугамтай болгоно.",
    pages: [
      ["eye01", "Self-line нүдний мэс засал"],
      ["eye02", "Нүдний хэлбэр засах"],
      ["eye03", "Доод зовхины өөх авах"],
      ["eye04", "Контурын арын зүсэлт"],
      ["eye05", "Доод зовхи"],
      ["eye06", "Нүдний дахин мэс засал"],
      ["eye07", "Lunch-time доод зовхины лазер"],
    ],
  },
  {
    key: "nose",
    title: "Хамар",
    href: "/nose/nose01.html",
    intro: "Нүүрний төвийн тэнцвэрийг хадгалсан, өөрт зохицсон хамрын хэлбэрийн төлөвлөлт.",
    pages: [
      ["nose01", "Эмэгтэй High-ko"],
      ["nose02", "Зүсэлтгүй хамрын мэс засал"],
      ["nose03", "Topsko X Newvia"],
      ["nose04", "Алтан харьцааны хамар"],
      ["nose05", "Forever хамар"],
      ["nose06", "Хамрын дахин мэс засал"],
    ],
  },
  {
    key: "hair",
    title: "Үс шилжүүлэн суулгах",
    href: "/hair/hair01.html",
    intro: "Үсний шугам, нягтрал, донор хэсгийг нарийвчлан тооцсон байгалийн үр дүнд чиглэнэ.",
    pages: [["hair01", "Үс шилжүүлэн суулгах"]],
  },
  {
    key: "body",
    title: "Биеийн хэлбэр",
    href: "/body/body01.html",
    intro: "Өөхний тархалт, арьсны чанга байдал, биеийн пропорцыг хамтад нь засах контурын програм.",
    pages: [
      ["body01", "Fix өөх соруулах"],
      ["body02", "All-in-one fills тарилга"],
      ["body03", "Line-fit тарилга"],
      ["body04", "Ulfit биеийн лифтинг"],
    ],
  },
  {
    key: "ultherapy",
    title: "Ultherapy",
    href: "/ultherapy/ultherapy01.html",
    intro: "Арьсны гүн давхаргад чиглэсэн энерги ашиглан чангаруулах, өргөх non-surgical програм.",
    pages: [["ultherapy01", "Ultherapy Prime"]],
  },
  {
    key: "company",
    title: "Эмнэлгийн тухай",
    href: "/company/about.html",
    intro: `${clinicName} нь нарийн оношилгоо, хувь хүнд тохирсон төлөвлөгөө, дараах арчилгааг нэг урсгалаар санал болгодог.`,
    pages: [
      ["about", "JY танилцуулга"],
      ["medicalteam", "Эмч нар"],
      ["panorama", "Эмнэлгийн орчин"],
      ["guide", "Үзлэгийн мэдээлэл"],
      ["location", "Байршил"],
    ],
  },
  {
    key: "community",
    title: "Нийгэмлэг",
    href: "/community/reservation.html",
    intro: "Онлайн зөвлөгөө, мэдээ, бодит сэтгэгдэл болон өмнө/дараах мэдээллийг нэг дороос үзнэ үү.",
    pages: [
      ["reservation", "Онлайн зөвлөгөө захиалах"],
      ["notice", "Мэдэгдэл"],
      ["media", "Хэвлэл мэдээлэл"],
      ["realreview", "Бодит сэтгэгдэл"],
      ["starwithjy", "Star with JY"],
      ["BeforeAfter", "Өмнө ба дараа"],
    ],
  },
  {
    key: "other",
    title: "Бодлого",
    href: "/other/other01.html",
    intro: "Хувийн мэдээлэл болон имэйл цуглуулахтай холбоотой бодлого.",
    pages: [
      ["other01", "Хувийн мэдээллийн бодлого"],
      ["other02", "Имэйл цуглуулах татгалзал"],
    ],
  },
];

const pageMeta = new Map();
for (const group of groups) {
  for (const [slug, title] of group.pages) {
    const href = pageHref(group.key, slug);
    pageMeta.set(href, { group, slug, title, href });
  }
}

const highlights = [
  "1:1 нарийвчилсан зөвлөгөө",
  "Хувь хүний нүүр, биеийн харьцаанд тохирсон төлөвлөгөө",
  "Мэс заслын дараах тогтмол арчилгаа",
  "Монгол хэлтэй үйлчлүүлэгчид ойлгомжтой мэдээлэл",
];

const heroImages = [
  asset("/common/img/main/section01_bgimg01.png"),
  asset("/common/img/main/section01_bgimg04.png"),
  asset("/common/img/main/section01_bgimg05.png"),
  asset("/common/img/main/section01_bgimg03.png"),
  asset("/common/img/main/section01_bgimg02.png"),
  asset("/common/img/main/section01_bgimg08.png"),
  asset("/common/img/main/section01_bgimg07.png"),
  asset("/common/img/main/section01_bgimg06.png"),
  asset("/common/img/main/section01_bgimg09.png"),
];

const groupImages = {
  lifting: asset("/common/img/main/section01_bgimg01.png"),
  chest: asset("/common/img/main/section01_bgimg04.png"),
  eye: asset("/common/img/main/section01_bgimg05.png"),
  nose: asset("/common/img/main/section01_bgimg02.png"),
  hair: asset("/common/img/main/section01_bgimg08.png"),
  body: asset("/common/img/main/section01_bgimg07.png"),
  ultherapy: asset("/common/img/main/section01_bgimg06.png"),
  company: asset("/common/img/main/section01_bgimg09.png"),
  community: asset("/common/img/main/section01_bgimg03.png"),
};

const imageFor = (key, fallbackIndex = 0) => groupImages[key] || heroImages[fallbackIndex % heroImages.length];
const groupImageOffset = { lifting: 0, chest: 2, eye: 4, nose: 6, hair: 1, body: 3, ultherapy: 5, company: 7, community: 8 };
function pageImageFor(meta) {
  const pageIndex = Math.max(0, meta.group.pages.findIndex(([slug]) => slug === meta.slug));
  const offset = groupImageOffset[meta.group.key] || 0;
  return heroImages[(offset + pageIndex) % heroImages.length];
}

const treatmentProfiles = {
  lifting: {
    summary: "Арьсны унжилт, нүүрний V-line, хацар болон эрүүний шугамыг хамтад нь харж өргөх чиглэлээр төлөвлөдөг лифтинг хөтөлбөр.",
    hero: "Утас, энерги, тарилга зэрэг аргыг нүүрний бүтэц, унжилтын түвшин, сэргэлтийн хугацаанд тохируулан сонгоно.",
    tags: ["V-line", "Унжилт", "Арьсны уян хатан"],
    steps: [
      ["Унжилтын оношилгоо", "Хацар, эрүүний шугам, nasolabial fold болон арьсны зузааныг хамтад нь шалгана."],
      ["Өргөх цэг тогтоох", "Зөвхөн татах бус нүүрний жинг хаанаас дэмжихийг төлөвлөнө."],
      ["Арга сонголт", "PCL, Mint, Silhouette, laser, injection зэрэг аргыг нөхцөлд тааруулна."],
      ["Хаван ба арчилгаа", "Сэргэлтийн үеийн хаван, таталдах мэдрэмж, арчилгааны зааврыг тайлбарлана."],
    ],
    balance: ["Шугам засалт", "Өргөх хүч ба байгалийн хөдөлгөөн"],
    before: "Нүүрний доод хэсэг сулрах, хацар доошлох, эрүүний шугам бүдгэрэх асуудлыг тодруулна.",
    after: "Нүүрний доод шугам илүү цэгцтэй, хэт татагдсан биш байгалийн өргөлттэй харагдахыг зорьдог.",
    details: ["Унжилтын хэмжээ", "Лифтингийн төрөл", "Дараах арчилгаа"],
    reviews: ["“Эрүүний шугам илүү тод болсон ч нүүрний хөдөлгөөн байгалийн хэвээр байсан.”", "“Миний унжилтын түвшинд ямар арга тохирохыг ойлгомжтой тайлбарласан.”", "“Хаван буурах хугацаа, арчилгааг урьдчилан мэдэж авсан.”"],
  },
  chest: {
    summary: "Хөхний хэмжээ, байрлал, арьс болон эдийн нөхцөл, биеийн нийт харьцаанд тохируулсан хөхний хэлбэр засах хөтөлбөр.",
    hero: "Имплант, өөрийн өөх, дахин мэс засал, дараах арчилгааг биеийн пропорцод нийцүүлэн төлөвлөнө.",
    tags: ["Volume", "Line-up", "Body balance"],
    steps: [
      ["Биеийн харьцаа", "Мөр, цээж, бэлхүүс, ташааны харьцааг хамтад нь харна."],
      ["Эдийн нөхцөл", "Арьсны суналт, эдийн зузаан, одоогийн байрлалыг үнэлнэ."],
      ["Хэлбэр сонголт", "Motiva, Pulse, өөх шилжүүлэлт зэрэг сонголтыг хүссэн үр дүнд тааруулна."],
      ["Дараах менежмент", "Хаван, байрлал, сорви, дэмжих арчилгааг шат дараатай зааварлана."],
    ],
    balance: ["Хэмжээний сонголт", "Биеийн пропорц ба байгалийн хэлбэр"],
    before: "Хэт жижиг, унжсан, тэгш бус эсвэл өмнөх мэс заслын үр дүнтэй холбоотой асуудлыг шалгана.",
    after: "Биеийн харьцаанд зохицсон, хувцас өмсөхөд илүү тэнцвэртэй харагдах хэлбэрийг зорьдог.",
    details: ["Хэмжээ ба байрлал", "Имплант/өөхний сонголт", "Сэргэлтийн төлөвлөгөө"],
    reviews: ["“Зөвхөн томруулах биш миний биеийн харьцаанд тохирох хэмжээг зөвлөсөн.”", "“Дараах арчилгааны үе шат тодорхой байсан.”", "“Хэлбэрийг байгалийн харагдуулахыг чухалчилсан.”"],
  },
  eye: {
    summary: "Давхраа, зовхи, нүдний булчин, доод зовхины өөхийг нарийвчлан харж нүдний төрхийг цэгцлэх хөтөлбөр.",
    hero: "Self-line, нүдний хэлбэр засах, доод зовхины өөх авах, арын зүсэлт, дахин мэс засал зэргийг нүдний бүтэцтэй уялдуулна.",
    tags: ["Self-line", "Зовхи", "Доод зовхи"],
    steps: [
      ["Нүдний бүтэц", "Зовхины зузаан, булчингийн хүч, одоогийн давхрааг шалгана."],
      ["Шугам төлөвлөх", "Хэт өндөр биш, нүүрний төрхтэй нийцэх давхрааны шугамыг сонгоно."],
      ["Асуудал шийдэх", "Унжсан зовхи, өөх, тэгш бус байдал, дахин засах хэрэгцээг ангилна."],
      ["Хаван бууруулах", "Нүд орчмын хаван, сорви, будалт эхлэх хугацааг тайлбарлана."],
    ],
    balance: ["Давхрааны нарийвчлал", "Нүдний илэрхийлэл ба симметр"],
    before: "Нойрмог харагдах, давхраа бүдэг, доод зовхины өөх, тэгш бус байдал зэргийг шалгана.",
    after: "Илүү тод боловч нүүрний төрхөөс салангид биш, цэвэрхэн нүдний шугамыг зорьдог.",
    details: ["Давхраа", "Нүдний булчин", "Доод зовхи"],
    reviews: ["“Нүд илүү цэвэрхэн болсон ч хиймэл давхраа шиг харагдаагүй.”", "“Доод зовхины асуудлыг тусад нь тайлбарлаж өгсөн.”", "“Дахин мэс заслын боломж, эрсдэлийг ойлгомжтой хэлсэн.”"],
  },
  nose: {
    summary: "Нүүрний төвийн тэнцвэр, хамрын өндөр, үзүүр, хамрын далавч болон өмнөх мэс заслын нөхцөлийг харгалзсан хамрын хөтөлбөр.",
    hero: "Зүсэлтгүй арга, Topsko, Golden ratio, Forever nose, дахин мэс заслыг нүүрний профайлтай хамтад нь төлөвлөнө.",
    tags: ["Profile", "Tip line", "Golden ratio"],
    steps: [
      ["Профайл оношилгоо", "Дух, хамар, уруул, эрүүг хажуу талаас нь хамтад нь харна."],
      ["Хамрын шугам", "Өндөр, үзүүр, далавч, хамрын нурууны хэлбэрийг тусад нь төлөвлөнө."],
      ["Материал ба арга", "Зүсэлтгүй эсвэл мэс заслын аргыг одоогийн бүтэцтэй нийцүүлнэ."],
      ["Амьсгал ба арчилгаа", "Хаван, наалт, хэлбэр тогтох хугацаа болон анхаарах зүйлсийг зааварлана."],
    ],
    balance: ["Хамрын өндөр", "Нүүрний нийт харьцаа"],
    before: "Хамрын нуруу нам, үзүүр бүдэг, өмнөх мэс заслын хэлбэр эсвэл тэгш бус байдлыг шалгана.",
    after: "Нүүрний төвийг илүү цэгцтэй болгож, хэт өндөр биш зохицсон профайлыг зорьдог.",
    details: ["Профайл", "Хамрын үзүүр", "Дахин засалт"],
    reviews: ["“Хамар л өөрчлөгдөхөөс илүү нүүрний харьцааг хамтад нь харсан.”", "“Өндөр, үзүүрийн ялгааг зурагтай тайлбарласан.”", "“Дахин мэс заслын үед анхаарах зүйлсийг тодорхой хэлсэн.”"],
  },
  hair: {
    summary: "Үсний шугам, нягтрал, донор хэсэг, үс уналтын чиглэлийг тооцон байгалийн харагдах үс шилжүүлэн суулгах хөтөлбөр.",
    hero: "Духны шугам, M хэлбэр, сийрэгжилт, донор үсний нөөцийг үнэлж суулгах хэмжээ, чиглэл, нягтралыг төлөвлөнө.",
    tags: ["Hair line", "Density", "Donor area"],
    steps: [
      ["Үсний шугам", "Духны өндөр, нүүрний хэлбэр, хүссэн hairline-ийг шалгана."],
      ["Донор үнэлгээ", "Арын хэсгийн нягтрал, авах боломжтой үсний хэмжээг тооцно."],
      ["Суулгах дизайн", "Үсний ургах чиглэл, нягтрал, шилжилтийн шугамыг төлөвлөнө."],
      ["Ургалтын арчилгаа", "Ургах хугацаа, угаалт, уналтын үе, хяналтын зааврыг өгнө."],
    ],
    balance: ["Шугам дизайн", "Нягтрал ба ургах чиглэл"],
    before: "Дух өндөр, M хэлбэр, сийрэгжилт эсвэл өмнөх суулгалтын нягтралын асуудлыг шалгана.",
    after: "Нүүрний хэлбэртэй нийцсэн, ойроос харахад ч байгалийн hairline-ийг зорьдог.",
    details: ["Hairline", "Донор хэсэг", "Ургалтын хяналт"],
    reviews: ["“Үсний шугамыг миний нүүрэнд тааруулж зурж өгсөн.”", "“Нягтрал, ургах хугацааг бодитоор тайлбарласан.”", "“Донор хэсгийн хязгаарыг ойлгомжтой хэлсэн.”"],
  },
  body: {
    summary: "Өөхний тархалт, арьсны чанга байдал, биеийн контур, хувцас өмсөхөд харагдах шугамыг хамтад нь засах хөтөлбөр.",
    hero: "Өөх соруулах, line-fit тарилга, all-in-one fills, body lifting зэргийг хэсэг бүрийн онцлогт тааруулна.",
    tags: ["Body line", "Contour", "Fit"],
    steps: [
      ["Хэсэг тодорхойлох", "Гэдэс, гар, гуя, хажуу хэсэг зэрэг асуудалтай хэсгийг ангилна."],
      ["Өөх ба арьс", "Өөхний зузаан, арьсны сулрал, целлюлит маягийн өөрчлөлтийг шалгана."],
      ["Арга сонгох", "Соруулах, тарилга, лифтингийг хэсгийн нөхцөлд тааруулна."],
      ["Дараах хэлбэр", "Хаван, шахалтын хувцас, хөдөлгөөн, арчилгааны үе шатыг тайлбарлана."],
    ],
    balance: ["Хэсгийн хэмжээ", "Биеийн нийт силуэт"],
    before: "Хэсэгчилсэн өөх, хувцас өмсөхөд илрэх шугам, арьсны сулралыг шалгана.",
    after: "Тухайн хэсгийг багасгахаас гадна биеийн нийт харьцаанд нийцсэн силуэтийг зорьдог.",
    details: ["Өөхний тархалт", "Контур дизайн", "Шахалт ба арчилгаа"],
    reviews: ["“Надад хэрэгтэй хэсэг, хэрэггүй хэсгийг ялгаж тайлбарласан.”", "“Хэмжээ багасахаас гадна шугамыг харсан.”", "“Сэргэлтийн хугацаа, шахалтын хувцасны заавар тодорхой байсан.”"],
  },
  ultherapy: {
    summary: "Зүсэлтгүйгээр арьсны гүн давхаргад энерги өгч, унжилт болон уян хатан байдлыг сайжруулах non-surgical lifting хөтөлбөр.",
    hero: "Ultherapy Prime нь нүүр, эрүү, хүзүү орчмын гүн давхаргыг чиглүүлж байгалийн чангарлыг дэмжихэд төвлөрнө.",
    tags: ["Non-surgical", "Deep lifting", "Prime"],
    steps: [
      ["Арьсны давхарга", "Арьсны зузаан, унжилтын түвшин, эмчилгээний цэгийг шалгана."],
      ["Шот төлөвлөх", "Нүүрний хэсэг бүрт тохирох энерги, shot тоо, гүнийг төлөвлөнө."],
      ["Энерги өгөх", "Арьсны гүн давхаргад чиглэсэн energy lifting-ийг хийдэг."],
      ["Үр дүн хянах", "Чангарлын өөрчлөлт, мэдрэмж, дараах арчилгааг тайлбарлана."],
    ],
    balance: ["Энергийн гүн", "Байгалийн чангарлын явц"],
    before: "Зүсэлтгүйгээр унжилт, давхар эрүү, хацрын сулралыг сайжруулах боломжийг шалгана.",
    after: "Нүүрний шугамыг аажмаар чангаруулж, өдөр тутмын амьдралд саад багатай үр дүнг зорьдог.",
    details: ["Shot төлөвлөгөө", "Гүн давхарга", "Non-surgical care"],
    reviews: ["“Мэс засалгүй аргаар ямар өөрчлөлт хүлээж болохыг бодитоор тайлбарласан.”", "“Энерги өгөх хэсэг бүрийг урьдчилан тэмдэглэсэн.”", "“Дараа нь шууд өдөр тутмын ажилдаа орох боломжийг ярилцсан.”"],
  },
};

function treatmentCopy(meta) {
  return treatmentProfiles[meta.group.key] || treatmentProfiles.lifting;
}

function ensureDir(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
}

function replaceLegacyAssetUrls(content) {
  return Object.entries(legacyVisualMap).reduce((next, [legacyPath, localPath]) => {
    return next
      .replaceAll(`http://www.jy-clinic.com${legacyPath}`, localPath)
      .replaceAll(legacyPath, localPath);
  }, content);
}

function nav(activeKey) {
  return groups
    .filter((g) => !["other", "community"].includes(g.key))
    .map(
      (g) => `<li class="${g.key === activeKey ? "active" : ""}">
        <a href="${g.href}">${g.title}</a>
        <div class="mega">
          ${g.pages
            .map(([slug, title]) => `<a href="${pageHref(g.key, slug)}">${title}</a>`)
            .join("")}
        </div>
      </li>`
    )
    .join("");
}

function subnav(group, currentHref) {
  return group.pages
    .map(([slug, title]) => {
      const href = pageHref(group.key, slug);
      return `<a class="${href === currentHref ? "active" : ""}" href="${href}">${title}</a>`;
    })
    .join("");
}

function layout(meta, body, isHome = false) {
  const title = isHome ? `${clinicName} Монгол` : `${meta.title} | ${clinicName}`;
  const activeKey = isHome ? "" : meta.group.key;
  return `<!DOCTYPE html>
<html lang="mn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
  <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="/" aria-label="${clinicName} home">
      <span class="brand-mark">JY</span>
      <span><strong>${clinicName}</strong><em>Монгол хэл</em></span>
    </a>
    <button class="nav-toggle" type="button" aria-label="Цэс нээх" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="primary-nav">
      <ul>${nav(activeKey)}</ul>
    </nav>
    <div class="lang"><a href="http://www.jy-clinic.com/">KR</a><a href="/en/">EN</a><strong>MN</strong></div>
  </header>
  ${body}
  <aside class="quick">
    <button class="quick-contact-toggle" type="button" aria-expanded="false" aria-controls="quickContactPanel">
      <span>☎</span><b>Холбогдох</b>
    </button>
    <div class="quick-contact-panel" id="quickContactPanel">
      <a href="tel:72107203"><span>☎</span><b>Монгол дугаар луу залгах</b></a>
      <a href="tel:+821098977684"><span>☎</span><b>Солонгос дугаар луу залгах</b></a>
      <button class="quick-contact-close" type="button">× Хаах</button>
    </div>
  </aside>
  <footer class="footer">
    <div>
      <strong>${clinicName}</strong>
      <p>${clinicAddress}</p>
      <p>Холбоо барих: <a href="tel:+821098977684">${clinicPhone}</a></p>
    </div>
    <div class="footer-links">
      <a href="/other/other01.html">Хувийн мэдээллийн бодлого</a>
      <a href="/other/other02.html">Имэйл цуглуулах татгалзал</a>
    </div>
  </footer>
  <script src="/assets/js/site.js"></script>
</body>
</html>`;
}

function home() {
  const cards = groups
    .filter((g) => !["other"].includes(g.key))
    .map(
      (g, i) => `<article class="program-card">
        <img src="${imageFor(g.key, i)}" alt="">
        <div>
          <p>JY PROGRAM</p>
          <h3>${g.title}</h3>
          <span>${g.intro}</span>
          <a href="${g.href}">Дэлгэрэнгүй</a>
        </div>
      </article>`
    )
    .join("");
  return layout(
    { title: "Нүүр", group: { key: "" } },
    `<main>
      <section class="home-hero">
        <div class="hero-card-stack" aria-label="JY main visual carousel">
          <article class="hero-image-card card-back-left">
            <img src="/assets/img/about/chest_figureUl_img01.jpg" alt="">
            <span>Аюулгүй мэс заслын нарийн стандарт</span>
          </article>
          <article class="hero-image-card card-left">
            <img src="/assets/img/about/panorama1_img04.jpg" alt="">
            <span>Лифтинг, нүд, хамрын мэс заслын төлөвлөгөө</span>
          </article>
          <article class="hero-image-card card-main">
            <img src="/assets/img/about/panorama3_img01.jpg" alt="">
            <button type="button" aria-label="favorite">♥</button>
            <div>
              <p>JY PLASTIC SURGERY</p>
              <h1>JY гоо сайхны мэс заслын эмнэлэг</h1>
            </div>
          </article>
          <article class="hero-image-card card-right">
            <img src="/assets/img/about/about_figureUl_img02.jpg" alt="">
            <span>1:1 оношилгоо, зөвлөгөө ба after care</span>
          </article>
          <article class="hero-image-card card-back-right">
            <img src="/assets/img/about/panorama4_img03.jpg" alt="">
            <span>Туршлагатай эмч нарын шууд хариуцсан арчилгаа</span>
          </article>
        </div>
        <div class="hero-dots" aria-hidden="true"><span class="active"></span><span></span><span></span><span></span><span></span></div>
      </section>
      <section class="intro-band" aria-label="JY highlights">
        <div class="marquee-track">
          ${[...highlights, ...highlights].map((h) => `<span>${h}</span>`).join("")}
        </div>
      </section>
      <section class="program-grid">${cards}</section>
      <section class="review-showcase" aria-label="Үйлчлүүлэгчдийн үнэлгээ">
        <div class="review-heading">
          <p class="eyebrow">СЭТГЭГДЭЛ</p>
          <h2>Үйлчлүүлэгчдийн үнэлгээ</h2>
        </div>
        <div class="review-slider">
          <article class="review-big-card">
            <div class="review-avatar">А</div>
            <div><strong>Ан***р</strong><span>★★★★★</span></div>
            <p>Эмч нар маш эелдэг, мэргэжлийн өндөр түвшинд үйлчилсэн. Үр дүн нь байгалийн харагдаж, баярлалаа!</p>
          </article>
          <article class="review-big-card">
            <div class="review-avatar">С</div>
            <div><strong>Са***а</strong><span>★★★★★</span></div>
            <p>Лифтингийн зөвлөгөө маш ойлгомжтой байсан. Миний нүүрний хэлбэрт тохирсон төлөвлөгөө гаргаж өгсөн.</p>
          </article>
          <article class="review-big-card">
            <div class="review-avatar">Б</div>
            <div><strong>Ба***л</strong><span>★★★★★</span></div>
            <p>Монгол хэлээр мэдээлэл авч чадсан нь их тухтай байлаа. Дараах арчилгааг ч нарийн тайлбарлаж өгсөн.</p>
          </article>
          <article class="review-big-card">
            <div class="review-avatar">Н</div>
            <div><strong>Ня***а</strong><span>★★★★★</span></div>
            <p>Нүдний мэс заслын дараа төрх маань илүү цэвэрхэн болсон. Хэт хиймэл биш байгалийн үр дүн гарсан.</p>
          </article>
          <article class="review-big-card">
            <div class="review-avatar">О</div>
            <div><strong>Од***а</strong><span>★★★★★</span></div>
            <p>Эмнэлгийн орчин цэвэрхэн, зөвлөгөөнөөс арчилгаа хүртэл нэг баг хариуцаж байгаа нь итгэл төрүүлсэн.</p>
          </article>
        </div>
      </section>
    </main>`,
    true
  );
}

function page(meta) {
  const idx = [...pageMeta.keys()].indexOf(meta.href);
  const hero = pageImageFor(meta);
  const isCommunity = meta.group.key === "community";
  const isCompany = meta.group.key === "company";
  const pageBody = `<main>
    <section class="sub-hero" style="--hero:url('${hero}')">
      <div>
        <p class="eyebrow">${meta.group.title}</p>
        <h1>${meta.title}</h1>
        <p>${meta.group.intro}</p>
      </div>
    </section>
    <nav class="subnav">${subnav(meta.group, meta.href)}</nav>
    <section class="content-wrap">
      <article class="lead-panel">
        <p class="eyebrow">JY SPECIAL</p>
        <h2>${meta.title}</h2>
        <p>${description(meta)}</p>
      </article>
      ${isCommunity ? community(meta) : isCompany ? company(meta) : treatment(meta)}
    </section>
  </main>`;
  return layout(meta, pageBody);
}

function description(meta) {
  if (meta.group.key === "company") return "JY эмнэлгийн үйлчилгээ, эмч нар, орчин болон ирэх замын мэдээллийг Монгол хэлээр нэгтгэн үзүүлэв.";
  if (meta.group.key === "community") return "Зөвлөгөө, мэдээ, сэтгэгдэл болон өмнө/дараах мэдээллийг хялбар уншигдах хэлбэрээр бэлтгэв.";
  if (meta.group.key === "other") return "Үйлчлүүлэгчийн мэдээллийн хамгаалалт, цахим холбоотой холбоотой үндсэн зарчим.";
  return `${meta.title}: ${treatmentCopy(meta).summary}`;
}

function treatment(meta) {
  if (meta.group.key === "lifting" && meta.slug === "lifting12") return liftingMainDetail(meta);
  const copy = treatmentCopy(meta);
  const stepHtml = copy.steps
    .map(([title, text], i) => `<article><b>Step ${String(i + 1).padStart(2, "0")}</b><h4>${title}</h4><p>${text}</p></article>`)
    .join("");
  const detailHtml = copy.details
    .map((title, i) => {
      const text = [
        "Эмчтэй хийх зөвлөгөөнөөр тухайн хэсгийн онцлог, хүссэн өөрчлөлт, боломжит аргыг хамтад нь үнэлнэ.",
        "Нэг төрлийн аргаас илүү тухайн ангилал болон хүний бүтцэд тохирох төлөвлөгөөг сонгоно.",
        "Сэргэлтийн хугацаа, дараах арчилгаа, анхаарах зүйлсийг урьдчилан тайлбарлана.",
      ][i];
      return `<div class="detail-card ${i === 0 ? "dark" : ""}"><h3>${title}</h3><p>${text}</p></div>`;
    })
    .join("");
  const reviewHtml = copy.reviews.map((review) => `<blockquote>${review}</blockquote>`).join("");
  return `<section class="beauty-detail">
    <div class="beauty-hero">
      <div class="beauty-copy">
        <span class="pill">JY CUSTOM PLAN</span>
        <h2>${meta.title}</h2>
        <p>${copy.hero}</p>
        <div class="tag-row">
          ${copy.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
      </div>
      <div class="beauty-visual">
        <img src="${pageImageFor(meta)}" alt="">
        <strong>jy</strong>
      </div>
    </div>
    <div class="steps-panel">
      <p class="eyebrow">4 STEP PROGRAM</p>
      <h3>${meta.title} ангиллын төлөвлөлт</h3>
      <div class="step-list">${stepHtml}</div>
    </div>
    <div class="balance-strip">
      <div><span>20%</span><p>${copy.balance[0]}</p></div>
      <div><span>80%</span><p>${copy.balance[1]}</p></div>
    </div>
    <div class="compare-panel">
      <div>
        <p class="eyebrow">Before</p>
        <h3>${meta.title} өмнө</h3>
        <p>${copy.before}</p>
      </div>
      <div>
        <p class="eyebrow">After</p>
        <h3>${meta.title} дараа</h3>
        <p>${copy.after}</p>
      </div>
    </div>
    <div class="review-panel">
      <p class="eyebrow">Real Review</p>
      <h3>Үйлчлүүлэгчийн сэтгэгдэл</h3>
      <div class="review-cards">${reviewHtml}</div>
    </div>
  </section>
  <section class="detail-grid">${detailHtml}</section>`;
}

function liftingMainDetail(meta) {
  const candidates = [
    "Насжилтаас болж арьсны уян хатан чанар буурсан тохиолдолд",
    "Зүсэлтгүй, аюулгүй non-surgical лифтинг хүсэж байгаа тохиолдолд",
    "Өмнөх лазер эмчилгээнээс хангалттай үр дүн мэдрээгүй тохиолдолд",
    "Контур мэс засал эсвэл өөх соруулахын дараа арьс сулран унжсан тохиолдолд",
    "Уян хатан чанар болон цайруулах эффектийг хамтад нь хүсэж байгаа тохиолдолд",
  ];
  const points = [
    ["Point. 01", "Тохируулсан лифтинг лазераар", "үр дүнг нэмэгдүүлдэг."],
    ["Point. 02", "Өөхнөөс гадна цуснаас авсан", "өсөлтийн хүчин зүйлийг хамтад нь шилжүүлэн суулгана."],
    ["Point. 03", "Арьсны гүн дэх коллагены нөхөн төлжилтийг дэмжиж", "үндсэн шалтгаанд чиглэн ажилладаг."],
    ["Point. 04", "Суларсан арьсыг чангалж", "булчин, уян хатан чанар, нүүр жижигрэх эффектийг хүлээж болно."],
    ["Point. 05", "Нарийн шилжүүлэн суулгалтаар", "эзлэхүүнтэй, залуу харагдах нүүрний төрхийг бүрдүүлдэг."],
  ];
  return `<section class="lifting-main-detail">
    <div class="lifting-main-hero">
      <div>
        <p class="eyebrow">JY LIFTING</p>
        <h2>Өсөлтийн хүчин зүйлийн нөхөн төлжүүлэх нөлөөг дээдэлсэн лифтинг</h2>
        <p>Зүсэлтгүй, мэс заслын бус аргаар илүү аюулгүй өргөх шийдлийг санал болгодог JY лифтинг.</p>
        <div class="lifting-hero-tags">
          <span>Non-surgical</span>
          <span>1:1 Custom</span>
          <span>Growth Factor</span>
        </div>
      </div>
      <div class="lifting-main-visual">
        <img src="${pageImageFor(meta)}" alt="">
        <strong>JY</strong>
      </div>
    </div>

    <div class="lifting-proof">
      <article>
        <p class="eyebrow">Expert Certified</p>
        <h3>20 гаруй жилийн мэс заслын ноу-хау</h3>
        <p>JY гоо сайхны мэс заслын эмнэлэг нь нарийн оношилгоо, хуримтлуулсан туршлага, эмч нарын итгэлийг авсан лифтингийн төлөвлөгөөгөөр ялгардаг.</p>
      </article>
      <article>
        <p class="eyebrow">Trusted Clinic</p>
        <h3>Эмч, захирлууд ч итгэн сонгодог лифтинг</h3>
        <p>Эмч болон эмнэлгийн удирдлагууд өөрсдөө итгэн утсан лифтинг хийлгэдэг газар гэдэг нь JY-ийн туршлага, тогтвортой үр дүнг илтгэнэ.</p>
      </article>
    </div>

    <div class="lifting-solution">
      <div>
        <p class="eyebrow">JY Solution</p>
        <h3>JY-ийн залуу төрхний гоо сайхны шийдэл</h3>
        <p>1:1 тохируулсан зөвлөгөөгөөр хүн бүрийн нүүрний хэлбэр, арьсны байдал, унжилтын шалтгаанд тохирсон шийдлийг санал болгож, зохицолтой залуу төрхийг бүтээнэ.</p>
      </div>
      <ul>
        ${candidates.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>

    <div class="lifting-reason-head">
      <p class="eyebrow">Why JY Lifting</p>
      <h3>JY лифтинг онцгой байдаг шалтгаан</h3>
      <p>JY гоо сайхны мэс заслын эмнэлэг нь 1:1 тохируулсан зөвлөгөөгөөр арьсны байдал, унжилтын шалтгаан, нүүрний бүтэц зэргийг нягт шалгасны дараа хувь хүнд тохирсон дизайнаар эмчилгээг төлөвлөдөг.</p>
    </div>
    <div class="lifting-point-grid">
      ${points.map(([no, title, text]) => `<article><b>${no}</b><h4>${title}</h4><p>${text}</p></article>`).join("")}
    </div>
    <div class="lifting-signature">JY PLASTIC SURGERY</div>
  </section>`;
}

function company(meta) {
  if (meta.slug === "about") return companyAbout();
  if (meta.slug === "medicalteam") return medicalTeam();
  if (meta.slug === "panorama") return panoramaPage();
  if (meta.slug === "guide") return guidePage();
  const rows = {
    about: ["Нарийн оношилгоо", "Төлөвлөгөө", "Арчилгаа"],
    medicalteam: ["Мэргэшсэн эмч нар", "1:1 зөвлөгөө", "Аюулгүй ажиллагаа"],
    panorama: ["Хүлээлгийн хэсэг", "Зөвлөгөөний өрөө", "Эмчилгээний орчин"],
    guide: ["Ажлын цаг", "Захиалга", "Гадаад үйлчлүүлэгч"],
    location: ["Сөүл", "Метро болон такси", "Урьдчилсан холбоо"],
  }[meta.slug] || ["Мэдээлэл", "Зөвлөгөө", "Дэмжлэг"];
  return `<section class="info-list">${rows
    .map((r, i) => `<div><b>0${i + 1}</b><h3>${r}</h3><p>Монгол үйлчлүүлэгчид ойлгомжтой байхаар үндсэн мэдээллийг товч, тодорхой байршуулсан.</p></div>`)
    .join("")}</section>`;
}

function companyAbout() {
  const values = [
    {
      img: "/assets/img/about/chest_figureUl_img05.jpg",
      title: "Арвин туршлага, ноу-хаутай ерөнхий эмч өөрөө хийдэг",
      text: "Идэвхтэй эрдэм шинжилгээний илтгэл, семинар, сургалт болон олон жилийн эмчилгээний туршлагад тулгуурлан итгэлтэй үр дүнд хүрэхийг зорьдог.",
    },
    {
      img: "/assets/img/about/about_figureUl_img06.jpg",
      title: "Илүү аюулгүй, сэтгэл ханамжтай мэс засалд зориулсан шинэ тоног төхөөрөмж",
      text: "JY нь HD өндөр нягтралтай дуран зэрэг тоног төхөөрөмжөөр илүү нарийн, аюулгүй мэс заслын үр дүнг дэмждэг.",
    },
    {
      img: "/assets/img/about/about_figureUl_img04.jpg",
      title: "Илүү сайн үр дүнгийн төлөө үргэлж судалдаг эмнэлэг",
      text: "Бүтээгдэхүүн, төхөөрөмжийн компаниудтай хамтран шууд туршилт, клиник үзүүлэн, судалгааг хийж илүү сайн эмнэлэг болохын төлөө ажилладаг.",
    },
    {
      img: "/assets/img/about/about_figureUl_img02.jpg",
      title: "Үйлчлүүлэгчийн аюулгүй байдлыг хамгаалах ариун цэврийн систем",
      text: "Ариун цэвэр, цэвэрлэгээ, халдваргүйжүүлэлтийг нэн тэргүүнд тавьж, эмчилгээний орчныг тогтмол хянадаг.",
    },
  ];
  return `<section class="about-story">
    <div class="about-hero-text">
      <p class="eyebrow">ABOUT JY</p>
      <h2>Нарийн мэдрэмжийн ялгаа үр дүнгээр батлагддаг.</h2>
      <p>Идэвхтэй эрдэм шинжилгээний илтгэл, семинар, лекц зэрэг баялаг клиник туршлага болон боловсорсон ноу-хаутай эмч нар шууд үзлэг, эмчилгээг хариуцан явуулдаг.</p>
    </div>
    <div class="doctor-panel">
      <div class="doctor-photo"><img src="/assets/img/about/ceo_round_img1.png" alt="JY representative doctor"></div>
      <div>
        <p class="eyebrow">DIRECT CARE</p>
        <h3>JY нь зөвлөгөөнөөс эхлээд мэс заслын дараах арчилгаа хүртэл ерөнхий эмч өөрөө хариуцдаг.</h3>
        <p>Арвин туршлага, нарийн оношилгоо, бодит зөвлөгөөнд тулгуурлан үйлчлүүлэгч бүрийн нөхцөлд тохирох төлөвлөгөөг гаргана.</p>
      </div>
    </div>
    <div class="about-quote">
      <p>“Эмч нар болон захирлууд итгэж сонгодог эмнэлэг, мэргэжилтнүүд ч итгэж эмчилгээ хийлгэдэг газар.”</p>
    </div>
    <div class="about-feature-grid">
      ${values.map((item, i) => `<article>
        <img src="${item.img}" alt="">
        <div><b>${String(i + 1).padStart(2, "0")}</b><h3>${item.title}</h3><p>${item.text}</p></div>
      </article>`).join("")}
    </div>
    <div class="about-gallery">
      <img src="/assets/img/about/chest_figureUl_img03.jpg" alt="">
      <img src="/assets/img/about/chest_figureUl_img01.jpg" alt="">
    </div>
  </section>`;
}

function guidePage() {
  return `<section class="guide-page">
    <div class="guide-hero">
      <img src="/assets/img/about/guide_art01_bg.jpg" alt="">
      <div>
        <p class="eyebrow">CLINIC GUIDE</p>
        <h2>Зөвлөгөөнөөс мэс засал хүртэл ерөнхий эмч өөрөө хариуцан ажилладаг.</h2>
        <p>Олон үйлчлүүлэгч JY гоо сайхны мэс заслын эмнэлгийг сонгосон шалтгаан бол итгэл ба найдвартай байдал юм.</p>
      </div>
    </div>
    <div class="hours-panel">
      <p class="eyebrow">CONSULTATION HOURS</p>
      <h3>Үзлэгийн цаг</h3>
      <div class="hours-list">
        <div><b>Даваа - Баасан</b><span>AM 9:30 - PM 18:30</span><em>Пүрэв гараг бүр амарна</em></div>
        <div><b>Бямба</b><span>AM 9:30 - PM 16:30</span><em>Урьдчилан цаг авахыг зөвлөж байна</em></div>
        <div><b>Ням, баярын өдөр, үндэсний баяр</b><span>Амарна</span><em>Амралтын өдрүүдэд онлайн зөвлөгөө үлдээж болно</em></div>
      </div>
    </div>
  </section>`;
}

function panoramaPage() {
  const spaces = [
    {
      img: "/assets/img/about/panorama3_img01.jpg",
      title: "Тав тухтай хүлээн авах орчин",
      text: "Үйлчлүүлэгчийн урсгал, зөвлөгөө, эмчилгээний хөдөлгөөнийг тайван, цэвэрхэн орчинд зохион байгуулдаг.",
    },
    {
      img: "/assets/img/about/panorama4_img03.jpg",
      title: "Нарийн зөвлөгөөний өрөө",
      text: "Зөвлөгөө бүрийг хувийн мэдээлэл, хүссэн өөрчлөлт, эмчилгээний төлөвлөгөөг анхааралтай ярилцах орчинд явуулна.",
    },
    {
      img: "/assets/img/about/panorama1_img04.jpg",
      title: "Итгэл дээр суурилсан аюулгүй эмчилгээ",
      text: "Ариун цэвэр, халдваргүйжүүлэлт, эмчилгээний өмнөх болон дараах хяналтыг үргэлж нэн тэргүүнд тавьдаг.",
    },
  ];
  return `<section class="panorama-page">
    <div class="panorama-head">
      <p class="eyebrow">PANORAMA</p>
      <h2>Ариун цэвэр, халдваргүйжүүлэлтийг үргэлж нэгдүгээрт тавьдаг Cheongdam JY гоо сайхны мэс заслын эмнэлэг.</h2>
      <p>Үйлчлүүлэгчийн аюулгүй байдал, тав тух, итгэлтэй эмчилгээнд зориулсан эмнэлгийн орчныг танилцуулж байна.</p>
    </div>
    <div class="panorama-hero-img"><img src="/assets/img/about/panorama3_img01.jpg" alt=""></div>
    <div class="panorama-grid">
      ${spaces.map((space, i) => `<article>
        <img src="${space.img}" alt="">
        <div><b>${String(i + 1).padStart(2, "0")}</b><h3>${space.title}</h3><p>${space.text}</p></div>
      </article>`).join("")}
    </div>
  </section>`;
}

function medicalTeam() {
  const doctors = [
    {
      name: "Ерөнхий эмч Чой Жүн Ён",
      role: "Representative Director",
      image: "/assets/img/about/medicalteam_art01_img02.jpg",
      intro: "Нарийн оношилгоо, олон жилийн клиник туршлага, боловсорсон техник дээр үндэслэн зөвлөгөөнөөс эхлээд арчилгаа хүртэл хариуцан ажилладаг.",
      credentials: [
        "Солонгосын Гоо сайхны мэс заслын нийгэмлэгийн насан туршийн гишүүн",
        "Солонгосын Гоо сайхны хуванцар мэс заслын нийгэмлэгийн жинхэнэ гишүүн",
        "Солонгосын Гавал-нүүрний хуванцар мэс заслын нийгэмлэгийн жинхэнэ гишүүн",
        "Солонгосын Бичил мэс заслын нийгэмлэгийн жинхэнэ гишүүн",
        "Солонгосын Түлэгдлийн нийгэмлэгийн жинхэнэ гишүүн",
        "IPRAS-ийн жинхэнэ гишүүн",
        "MERZ RADIESSE филлерийн клиник зөвлөх",
        "Daewoong Pharmaceutical-ийн клиник сургалтын эмч",
        "Sinclair компанийн Silhouette Soft & Ellanse Азийн эмнэлзүйн зөвлөх зөвлөлийн гишүүн",
        "Silhouette Soft Basic & Advanced Course-ийн мэргэжлийн сургалтын багш",
        "MEDYTOX-ийн клиник сургалтын эмч",
        "Германы ADODERM-ийн клиник сургалтын эмч",
        "АНУ-ын ALLERGAN-ийн клиник сургалтын эмч",
        "S.DIOMEDICS-ийн клиник зөвлөх",
        "KCR PARTNERS thread lifting-ийн зөвлөх",
        "JW Pharmaceutical ELLANSE филлерийн клиник зөвлөх",
        "FACETITE, NECKTITE нүүр болон хүзүүний өөх соруулах эмчилгээний зөвлөх",
        "Солонгосын Гоо сайхны мэс заслын нийгэмлэгийн ботокс-филлер судалгааны бүлгийн нарийн бичгийн дарга",
      ],
    },
    {
      name: "Ерөнхий эмч Ю До Ён",
      role: "Director",
      image: "/assets/img/about/medicalteam_art01_doctor_ydy.png",
      intro: "Арьс судлал, гоо сайхны лазер, таргалалт болон anti-aging чиглэлийн эмчилгээний туршлагад тулгуурлан хувь хүнд тохирсон арьсны эмчилгээг явуулдаг.",
      credentials: [
        "Арьс судлалын эмчилгээ",
        "Солонгосын Гоо сайхны мэс заслын лазерын анагаах ухааны нийгэмлэгийн жинхэнэ гишүүн",
        "Солонгосын Арьс, таргалалт, гоо сайхны мэс заслын нийгэмлэгийн жинхэнэ гишүүн",
        "Солонгосын Таргалалт ба гоо сайхны анагаах ухааны нийгэмлэгийн жинхэнэ гишүүн",
        "Солонгосын Anti-aging нийгэмлэгийн жинхэнэ гишүүн",
        "Солонгосын Лазер, арьс, үс судлалын нийгэмлэгийн жинхэнэ гишүүн",
      ],
    },
    {
      name: "Ерөнхий эмч Хо Вон Сил",
      role: "Director",
      image: "/assets/img/about/medicalteam_art01_img03.jpg",
      intro: "Хуванцар мэс засал, амны хөндий-нүүр эрүү нүүрний мэс засал, шүдний эмчилгээ, урлаг ба дизайны олон салбарын туршлагыг нэгтгэсэн нарийн мэргэжлийн зөвлөгөө, эмчилгээг явуулдаг.",
      credentials: [
        "Эмч, хуванцар мэс заслын доктор",
        "Шүдний эмч, амны хөндий-нүүр эрүү нүүрний мэс заслын доктор, интерн болон резидентур төгссөн",
        "Солонгосын Амны хөндий-нүүр эрүү нүүрний мэс заслын мэргэжилтэн ба удирдах эмч",
        "Солонгосын Эрүү нүүрний хуванцар сэргээн засах мэс заслын итгэмжлэгдсэн эмч ба удирдах эмч",
        "Японы Токио Анагаах ухаан, Шүдний их сургуулийн хуванцар мэс заслын тэнхимд сургалт",
        "Шведийн Uppsala их сургуулийн хуванцар мэс заслын тэнхимд сургалт",
        "Солонгосын Гоо сайхны мэс заслын нийгэмлэгийн итгэмжлэгдсэн мэргэжилтэн",
        "Үндэсний төв эмнэлгийн Шүдний төвийн дарга, мэргэжилтний холбооны дарга, эрүүл мэндийн үзлэгийн төвийн дарга, урлагийн галерейн дарга",
        "Korea University-ийн Клиник шүдний магистрын сургууль, шүдний анагаах ухааны магистр, шүдний гажиг засал",
        "Hongik University-ийн орчин үеийн урлагийн дээд түвшний курс",
        "Konkuk University-ийн Дизайны магистрын сургууль, текстилийн магистр",
        "Hongik University-ийн Дүрслэх урлагийн коллежийн доктор",
        "The Original Home Gallery-ийн захирал",
        "Олон соёлт хамтлагийн ахлагч",
        "Sungkyul University-ийн эмнэлгийн гоо сайхны мэргэжилтний хөтөлбөрийн эмнэлгийн хариуцсан профессор",
        "Хэрэглэгчийн эрхийг хамгаалах байгууллагын хуванцар мэс засал болон шүдний салбарын маргаан зохицуулах хорооны гишүүн",
        "БНХАУ-ын Шэньян амны хөндийн хавдрын эмнэлгийн хүндэт профессор",
        "Daegu Catholic University-ийн Анагаах ухааны сургуулийн хуванцар мэс заслын тэнхимийн гадуур профессор",
        "Seoul National University, Yonsei University, Korea University, Kyung Hee University-ийн гадуур профессор",
      ],
    },
  ];
  const doctorCards = doctors
    .map(
      (doctor) => `<div class="doctor-card">
      <div class="doctor-portrait"><img src="${doctor.image}" alt="${doctor.name}"></div>
      <div class="doctor-bio">
        <span class="pill">${doctor.role}</span>
        <h3>${doctor.name}</h3>
        <p>${doctor.intro}</p>
        <div class="credential-list">
          ${doctor.credentials.map((item) => `<p>${item}</p>`).join("")}
        </div>
      </div>
    </div>`
    )
    .join("");
  return `<section class="medical-profile">
    <div class="medical-intro">
      <p class="eyebrow">MEDICAL TEAM</p>
      <h2>JY гоо сайхны мэс заслын эмнэлгийн олон жилийн туршлага, ноу-хаутай ерөнхий эмчийг танилцуулж байна.</h2>
    </div>
    ${doctorCards}
  </section>`;
}

function community(meta) {
  if (meta.slug === "reservation") return reservationInfo();
  return `<section class="notice-list">
    ${[1, 2, 3, 4]
      .map(
        (n) => `<article>
          <span>JY ${String(n).padStart(2, "0")}</span>
          <h3>${meta.title} мэдээлэл ${n}</h3>
          <p>Энэ хэсэгт ${meta.title.toLowerCase()}-тай холбоотой Монгол хэлний агуулга байрлана.</p>
        </article>`
      )
      .join("")}
  </section>`;
}

function reservationInfo() {
  return `<section class="info-list">
    <div><b>01</b><h3>Утас</h3><p><a href="tel:+821098977684">${clinicPhone}</a> дугаараар холбогдон цаг авах боломжтой.</p></div>
    <div><b>02</b><h3>Kakao</h3><p><a href="https://pf.kakao.com/_wnxkxdb">Kakao сувгаар</a> асуулт, зураг болон хүссэн хөтөлбөрөө илгээж болно.</p></div>
    <div><b>03</b><h3>Байршил</h3><p>${clinicAddress}</p></div>
  </section>`;
}

function consultForm() {
  return `<section class="consult">
    <div>
      <p class="eyebrow">ONLINE CONSULTATION</p>
      <h2>Хурдан зөвлөгөө авах</h2>
      <p>Нэр, холбоо барих мэдээлэл, сонирхож буй хөтөлбөрөө үлдээнэ үү.</p>
    </div>
    <form>
      <input type="text" placeholder="Нэр">
      <input type="tel" placeholder="${clinicPhone}">
      <select><option>Сонирхож буй хөтөлбөр</option><option>Лифтинг</option><option>Нүд</option><option>Хамар</option><option>Хөх</option><option>Биеийн хэлбэр</option></select>
      <textarea placeholder="Зөвлөгөө авах зүйлээ бичнэ үү"></textarea>
      <button type="button">Зөвлөгөө хүсэх</button>
    </form>
  </section>`;
}

const css = `:root{--red:#e8527b;--red-dark:#9f2748;--pink:#ffd6e2;--cream:#fff3f7;--ink:#2a1b21;--muted:#7d5b65;--line:#f3c4d1}*{box-sizing:border-box}body{margin:0;font-family:"Pretendard","Segoe UI",Arial,sans-serif;color:var(--ink);background:#fffafc}a{color:inherit;text-decoration:none}img{max-width:100%;display:block}.site-header{position:sticky;top:0;z-index:20;height:92px;display:flex;align-items:center;padding:0 44px;background:rgba(255,250,252,.96);border-bottom:1px solid var(--line);backdrop-filter:blur(10px)}.brand{display:flex;align-items:center;gap:14px;min-width:270px}.brand-mark{display:grid;place-items:center;width:64px;height:64px;border:2px solid var(--red);color:var(--red);font-weight:900;font-size:28px;letter-spacing:0}.brand strong{display:block;color:var(--red);font-size:18px}.brand em{display:block;font-style:normal;color:var(--muted);font-size:12px;margin-top:3px}.primary-nav{flex:1}.primary-nav ul{display:flex;justify-content:center;gap:4px;list-style:none;margin:0;padding:0}.primary-nav li{position:relative}.primary-nav li>a{display:block;padding:34px 15px;font-weight:700;font-size:15px}.primary-nav li.active>a,.primary-nav li:hover>a{color:var(--red)}.mega{position:absolute;top:86px;left:50%;transform:translateX(-50%);display:none;min-width:230px;padding:18px;background:#fff;border-top:3px solid var(--red);box-shadow:0 20px 45px rgba(232,82,123,.16)}.primary-nav li:hover .mega{display:grid;gap:10px}.mega a{font-size:14px;color:#6f5360}.mega a:hover{color:var(--red)}.lang{display:flex;gap:8px;align-items:center;font-size:12px}.lang a,.lang strong{padding:7px 9px;border:1px solid var(--line)}.lang strong{background:var(--red);color:#fff}.nav-toggle{display:none}.home-hero{min-height:690px;display:flex;align-items:center;padding:80px 8vw;background:linear-gradient(90deg,rgba(255,236,243,.98) 0%,rgba(255,220,231,.82) 42%,rgba(255,247,250,.08) 70%),url("http://www.jy-clinic.com/common/img/main/section01_bgimg01.png") center right/contain no-repeat}.hero-copy{max-width:760px}.eyebrow{color:var(--red);font-size:13px;font-weight:800;letter-spacing:2px;text-transform:uppercase}.home-hero h1,.sub-hero h1{font-size:58px;line-height:1.12;margin:16px 0 22px;letter-spacing:0}.home-hero p:not(.eyebrow),.sub-hero p:not(.eyebrow){font-size:20px;line-height:1.75;color:#6f5360}.hero-actions{display:flex;gap:12px;margin-top:34px}.btn{padding:16px 24px;border:1px solid var(--red);font-weight:800}.btn.primary{background:var(--red);color:#fff}.btn.ghost{color:var(--red);background:#fff}.intro-band{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:linear-gradient(90deg,#e8527b,#f59ab4);color:#fff}.intro-band span{padding:28px 24px;text-align:center;border-right:1px solid rgba(255,255,255,.28);font-weight:700}.program-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;padding:80px 6vw;background:#fffafc}.program-card{position:relative;min-height:360px;overflow:hidden;background:#f6a1b8}.program-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.7}.program-card div{position:absolute;inset:auto 0 0;padding:28px;color:#fff;background:linear-gradient(transparent,rgba(159,39,72,.78))}.program-card p{font-size:12px;font-weight:800;color:#ffe7ee}.program-card h3{font-size:30px;margin:8px 0}.program-card span{display:block;line-height:1.65;color:#fff7fa}.program-card a{display:inline-block;margin-top:18px;padding:10px 16px;background:#fff;color:var(--red);font-weight:800}.sub-hero{min-height:430px;display:flex;align-items:end;padding:80px 8vw;background:linear-gradient(90deg,rgba(255,238,244,.98),rgba(255,224,233,.82),rgba(255,255,255,.08)),var(--hero) center right/contain no-repeat}.sub-hero>div{max-width:760px}.subnav{display:flex;gap:8px;overflow:auto;padding:20px 6vw;background:#fffafc;border-bottom:1px solid var(--line)}.subnav a{white-space:nowrap;padding:11px 16px;border:1px solid var(--line);font-size:14px;background:#fff}.subnav a.active{background:var(--red);border-color:var(--red);color:#fff}.content-wrap{padding:70px 6vw;background:#fffafc}.lead-panel{max-width:980px;margin:0 auto 34px;text-align:center}.lead-panel h2{font-size:42px;margin:10px 0}.lead-panel p:not(.eyebrow){font-size:18px;color:var(--muted);line-height:1.8}.detail-grid{display:grid;grid-template-columns:1.1fr 1fr 1fr;gap:22px;max-width:1180px;margin:0 auto 54px}.detail-card{padding:34px;border:1px solid var(--line);background:#fff}.detail-card.dark{background:linear-gradient(135deg,#e8527b,#f59ab4);color:#fff}.detail-card h3{font-size:24px;margin:0 0 16px}.detail-card p,.detail-card li{line-height:1.75;color:inherit}.detail-card ul{padding-left:20px}.consult{display:grid;grid-template-columns:.9fr 1.1fr;gap:32px;max-width:1180px;margin:0 auto;padding:44px;background:linear-gradient(135deg,#fff1f6,#ffe0ea);border-top:4px solid var(--red)}.consult h2{font-size:34px;margin:8px 0}.consult p{line-height:1.7;color:var(--muted)}.consult form{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.consult input,.consult select,.consult textarea{width:100%;border:1px solid var(--line);padding:15px;background:#fff;font:inherit}.consult textarea{grid-column:1/-1;min-height:110px}.consult button{grid-column:1/-1;border:0;background:var(--red);color:#fff;padding:16px;font-weight:900;font:inherit}.info-list,.notice-list{max-width:1100px;margin:0 auto 48px;display:grid;gap:14px}.info-list div,.notice-list article{display:grid;grid-template-columns:100px 1fr;gap:18px;align-items:center;padding:24px;border-bottom:1px solid var(--line);background:#fff}.info-list b,.notice-list span{font-size:28px;color:var(--red)}.info-list h3,.notice-list h3{margin:0;font-size:24px}.info-list p,.notice-list p{grid-column:2;color:var(--muted);line-height:1.7;margin:0}.quick{position:fixed;right:22px;bottom:22px;z-index:15;display:grid;gap:8px}.quick a{padding:13px 16px;background:linear-gradient(135deg,#e8527b,#f48fab);color:#fff;font-size:13px;font-weight:800;box-shadow:0 8px 24px rgba(232,82,123,.25)}.footer{display:flex;justify-content:space-between;gap:24px;padding:44px 6vw;background:linear-gradient(135deg,#8e2442,#e8527b);color:#fff}.footer p{color:#ffe5ed}.footer-links{display:flex;gap:18px;align-items:center;color:#fff2f6}@media(max-width:1100px){.site-header{height:auto;min-height:78px;padding:14px 20px;flex-wrap:wrap}.brand{min-width:auto}.nav-toggle{display:block;margin-left:auto;border:1px solid var(--line);background:#fff;padding:10px 13px;font-size:22px}.primary-nav{display:none;order:4;flex-basis:100%}.primary-nav.open{display:block}.primary-nav ul{display:block}.primary-nav li>a{padding:15px 0}.mega{position:static;display:grid;transform:none;box-shadow:none;border-top:1px solid var(--line);padding:0 0 14px}.lang{margin-left:12px}.home-hero h1,.sub-hero h1{font-size:40px}.home-hero{min-height:620px;background:linear-gradient(rgba(255,238,244,.96),rgba(255,224,233,.82)),url("http://www.jy-clinic.com/common/img/main/section01_bgimg01_m.png") bottom center/contain no-repeat}.intro-band,.program-grid,.detail-grid,.consult{grid-template-columns:1fr}.consult form{grid-template-columns:1fr}.footer{display:block}.quick{position:static;grid-template-columns:repeat(3,1fr);padding:14px;background:#fffafc}.quick a{text-align:center}}@media(max-width:640px){.brand-mark{width:50px;height:50px}.brand strong{font-size:15px}.lang{display:none}.home-hero,.sub-hero{padding:54px 22px}.home-hero h1,.sub-hero h1{font-size:32px}.home-hero p:not(.eyebrow),.sub-hero p:not(.eyebrow){font-size:16px}.hero-actions{display:grid}.program-grid,.content-wrap{padding:44px 20px}.lead-panel h2{font-size:30px}.info-list div,.notice-list article{grid-template-columns:1fr}.info-list p,.notice-list p{grid-column:1}.consult{padding:26px}.intro-band span{padding:18px}}`;

const detailCss = `
.beauty-detail{max-width:980px;margin:0 auto 62px;background:linear-gradient(180deg,#ffd4df 0%,#ffedf1 42%,#fff 100%);border:1px solid #f2b9c7;box-shadow:0 30px 70px rgba(164,31,53,.14);overflow:hidden}.beauty-hero{min-height:520px;display:grid;grid-template-columns:1.05fr .95fr;align-items:center;gap:28px;padding:58px 54px;background:radial-gradient(circle at 70% 20%,rgba(255,255,255,.92),rgba(255,255,255,0) 30%),linear-gradient(135deg,#f99bb5 0%,#ffdce6 55%,#fff6f8 100%)}.beauty-copy h2{font-size:54px;line-height:1.06;margin:18px 0 18px;color:#9c1e39}.beauty-copy p{font-size:18px;line-height:1.8;color:#6a3f4b}.pill,.tag-row span{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(164,31,53,.22);background:rgba(255,255,255,.72);color:#a41f35;font-weight:900}.pill{padding:8px 14px;border-radius:999px;font-size:12px;letter-spacing:1px}.tag-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:26px}.tag-row span{min-height:34px;padding:0 14px;border-radius:999px;font-size:12px}.beauty-visual{position:relative;min-height:430px;display:grid;place-items:end center}.beauty-visual:before{content:"";position:absolute;width:78%;aspect-ratio:1/1;border-radius:50%;background:rgba(255,255,255,.55);filter:blur(2px)}.beauty-visual img{position:relative;max-height:430px;object-fit:contain;filter:drop-shadow(0 24px 30px rgba(116,23,40,.25))}.beauty-visual strong{position:absolute;left:20px;bottom:8px;font-size:96px;line-height:1;color:rgba(164,31,53,.14);font-family:Georgia,serif}.steps-panel{padding:54px;background:#fff7fa;text-align:center}.steps-panel h3{font-size:34px;margin:10px 0 30px;color:#a41f35}.step-list{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;text-align:left}.step-list article{padding:22px;background:#fff;border:1px solid #f0bfcb;min-height:220px}.step-list b{display:inline-block;margin-bottom:16px;color:#e06182;font-size:13px}.step-list h4{margin:0 0 12px;font-size:19px;color:#8f1c32}.step-list p{margin:0;color:#73535c;line-height:1.65;font-size:14px}.balance-strip{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;padding:48px 54px;background:linear-gradient(135deg,#ff91ad,#ffd9e3);color:#fff}.balance-strip div{min-height:160px;display:grid;place-items:center;text-align:center;border:1px solid rgba(255,255,255,.55);background:rgba(255,255,255,.18)}.balance-strip span{font-size:58px;font-weight:900}.balance-strip p{max-width:260px;margin:0 auto;font-weight:800;line-height:1.5}.compare-panel{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:54px;background:#fff}.compare-panel>div{padding:28px;min-height:230px;border:1px solid #f0bfcb;background:linear-gradient(180deg,#fff,#fff4f7)}.compare-panel h3{font-size:28px;margin:8px 0 12px;color:#a41f35}.compare-panel p:not(.eyebrow){line-height:1.75;color:#73535c}.review-panel{padding:56px 54px;background:linear-gradient(180deg,#f47f9e,#ffd2df);text-align:center;color:#fff}.review-panel .eyebrow{color:#fff}.review-panel h3{font-size:34px;margin:8px 0 28px}.review-cards{display:grid;gap:14px}.review-cards blockquote{margin:0;padding:22px 24px;background:#fff;color:#6f4e57;border-radius:0;box-shadow:0 12px 28px rgba(116,23,40,.14);line-height:1.7;text-align:left}@media(max-width:1100px){.beauty-detail{max-width:92vw}.beauty-hero,.step-list,.compare-panel{grid-template-columns:1fr}.step-list{gap:10px}.beauty-copy h2{font-size:40px}.beauty-visual{min-height:320px}.beauty-visual img{max-height:320px}}@media(max-width:640px){.beauty-detail{max-width:none;margin-left:-20px;margin-right:-20px}.beauty-hero,.steps-panel,.balance-strip,.compare-panel,.review-panel{padding:34px 22px}.beauty-copy h2{font-size:32px}.balance-strip{grid-template-columns:1fr}.balance-strip span{font-size:44px}}
`;

const colorHarmonyCss = `
.beauty-detail{background:linear-gradient(180deg,#ffd2df 0%,#fff0f5 45%,#fffafc 100%);border-color:#f3c4d1;box-shadow:0 30px 70px rgba(232,82,123,.16)}.beauty-hero{background:radial-gradient(circle at 70% 20%,rgba(255,255,255,.92),rgba(255,255,255,0) 30%),linear-gradient(135deg,#f58eaa 0%,#ffd6e2 55%,#fff7fa 100%)}.beauty-copy h2,.steps-panel h3,.compare-panel h3{color:var(--red-dark)}.pill,.tag-row span{border-color:rgba(232,82,123,.28);color:var(--red);background:rgba(255,255,255,.78)}.beauty-visual img{filter:drop-shadow(0 24px 30px rgba(232,82,123,.24))}.beauty-visual strong{color:rgba(232,82,123,.16)}.steps-panel{background:#fff3f7}.step-list article,.compare-panel>div{border-color:var(--line)}.step-list b{color:var(--red)}.step-list h4{color:var(--red-dark)}.step-list p,.compare-panel p:not(.eyebrow),.review-cards blockquote{color:#795766}.balance-strip,.review-panel{background:linear-gradient(135deg,#e8527b,#f7a0b8)}.review-cards blockquote{box-shadow:0 12px 28px rgba(232,82,123,.16)}
`;

const marqueeCss = `
.intro-band{display:block;position:relative;overflow:hidden;padding:0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:linear-gradient(90deg,#e8527b,#f59ab4,#f4a0bb);color:#fff}.intro-band:before,.intro-band:after{content:"";position:absolute;top:0;bottom:0;width:90px;z-index:2;pointer-events:none}.intro-band:before{left:0;background:linear-gradient(90deg,#e8527b,rgba(232,82,123,0))}.intro-band:after{right:0;background:linear-gradient(270deg,#f4a0bb,rgba(244,160,187,0))}.marquee-track{display:flex;width:max-content;align-items:center;gap:64px;min-height:94px;animation:marquee-left 28s linear infinite;will-change:transform}.marquee-track span{display:inline-flex;align-items:center;white-space:nowrap;padding:0 4px;font-size:18px;font-weight:900;letter-spacing:0;color:#fff;text-shadow:0 1px 8px rgba(159,39,72,.18)}.marquee-track span:after{content:"";display:inline-block;width:8px;height:8px;margin-left:64px;border-radius:50%;background:rgba(255,255,255,.72)}.intro-band:hover .marquee-track{animation-play-state:paused}@keyframes marquee-left{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media(max-width:640px){.intro-band{padding:0}.marquee-track{gap:42px;min-height:82px;animation-duration:22s}.marquee-track span{font-size:15px}.marquee-track span:after{margin-left:42px}}
`;

const mobileSliderCss = `
@media(max-width:640px){.program-grid{display:flex;grid-template-columns:none;gap:14px;overflow-x:auto;overflow-y:hidden;padding:28px 20px 34px;scroll-snap-type:x mandatory;scroll-padding-left:20px;-webkit-overflow-scrolling:touch}.program-grid::-webkit-scrollbar{height:6px}.program-grid::-webkit-scrollbar-track{background:#ffe4ed}.program-grid::-webkit-scrollbar-thumb{background:#e8527b;border-radius:999px}.program-card{flex:0 0 86vw;min-width:86vw;min-height:360px;scroll-snap-align:start;background:linear-gradient(180deg,#f39ab4,#d94f79)}.program-card img{width:100%;height:100%;object-fit:contain;object-position:center top;opacity:.62}.program-card div{padding:22px;background:linear-gradient(180deg,rgba(232,82,123,.1) 0%,rgba(232,82,123,.5) 54%,rgba(159,39,72,.88) 100%)}.program-card h3{font-size:27px}.program-card span{font-size:14px;line-height:1.72}.program-card a{margin-top:16px}.program-grid:after{content:"";flex:0 0 6px}}
`;

const brandingCss = `
.brand{min-width:390px}.brand strong{max-width:300px;font-size:16px;line-height:1.25;word-break:keep-all}.footer strong{display:block;margin-bottom:10px;font-size:20px}.footer p{margin:6px 0;line-height:1.6}.quick a[href^="tel:"]{white-space:nowrap}@media(max-width:1100px){.brand{min-width:0;max-width:calc(100% - 76px)}.brand strong{max-width:230px;font-size:14px}.brand em{font-size:11px}}@media(max-width:640px){.brand{gap:10px}.brand strong{max-width:245px;font-size:13px;line-height:1.2}.brand em{font-size:10px}.footer strong{font-size:18px}}
`;

const purpleThemeCss = `
:root{--red:#7c3aed;--red-dark:#4c1d95;--pink:#e9d5ff;--cream:#f7f1ff;--ink:#21172f;--muted:#6d5a7d;--line:#d8c4f5}body{background:#fbf8ff}.site-header{background:rgba(251,248,255,.96);border-bottom-color:var(--line)}.brand-mark{border-color:var(--red);color:var(--red)}.brand strong,.primary-nav li.active>a,.primary-nav li:hover>a,.mega a:hover,.eyebrow,.btn.ghost,.program-card a,.info-list b,.notice-list span{color:var(--red)}.mega{border-top-color:var(--red);box-shadow:0 20px 45px rgba(124,58,237,.16)}.mega a{color:#604d73}.lang strong,.btn.primary,.subnav a.active,.consult button{background:var(--red);border-color:var(--red);color:#fff}.home-hero{background:linear-gradient(90deg,rgba(247,241,255,.98) 0%,rgba(233,213,255,.82) 42%,rgba(251,248,255,.08) 70%),url("http://www.jy-clinic.com/common/img/main/section01_bgimg01.png") center right/contain no-repeat}.home-hero p:not(.eyebrow),.sub-hero p:not(.eyebrow){color:#665377}.intro-band{background:linear-gradient(90deg,#6d28d9,#a855f7,#c084fc);border-color:var(--line)}.intro-band:before{background:linear-gradient(90deg,#6d28d9,rgba(109,40,217,0))}.intro-band:after{background:linear-gradient(270deg,#c084fc,rgba(192,132,252,0))}.program-grid,.content-wrap,.subnav,.quick{background:#fbf8ff}.program-card{background:#a855f7}.program-card div{background:linear-gradient(transparent,rgba(76,29,149,.82))}.program-card p{color:#f3e8ff}.program-card span{color:#fbf8ff}.sub-hero{background:linear-gradient(90deg,rgba(247,241,255,.98),rgba(233,213,255,.82),rgba(255,255,255,.08)),var(--hero) center right/contain no-repeat}.subnav{border-bottom-color:var(--line)}.subnav a,.detail-card,.consult input,.consult select,.consult textarea,.info-list div,.notice-list article{border-color:var(--line)}.detail-card.dark,.consult,.quick a,.footer{background:linear-gradient(135deg,#6d28d9,#a855f7)}.consult{border-top-color:var(--red)}.footer p{color:#f3e8ff}.footer-links{color:#fbf8ff}.beauty-detail{background:linear-gradient(180deg,#e9d5ff 0%,#f5edff 45%,#fbf8ff 100%);border-color:var(--line);box-shadow:0 30px 70px rgba(124,58,237,.16)}.beauty-hero{background:radial-gradient(circle at 70% 20%,rgba(255,255,255,.92),rgba(255,255,255,0) 30%),linear-gradient(135deg,#a855f7 0%,#e9d5ff 55%,#fbf8ff 100%)}.beauty-copy h2,.steps-panel h3,.compare-panel h3,.step-list h4{color:var(--red-dark)}.beauty-copy p,.step-list p,.compare-panel p:not(.eyebrow),.review-cards blockquote{color:#665377}.pill,.tag-row span{border-color:rgba(124,58,237,.28);color:var(--red);background:rgba(255,255,255,.78)}.beauty-visual img{filter:drop-shadow(0 24px 30px rgba(124,58,237,.24))}.beauty-visual strong{color:rgba(124,58,237,.16)}.steps-panel{background:#f7f1ff}.step-list article,.compare-panel>div{border-color:var(--line)}.step-list b{color:var(--red)}.balance-strip,.review-panel{background:linear-gradient(135deg,#6d28d9,#c084fc)}.review-cards blockquote{box-shadow:0 12px 28px rgba(124,58,237,.16)}.marquee-track span{text-shadow:0 1px 8px rgba(76,29,149,.2)}@media(max-width:1100px){.home-hero{background:linear-gradient(rgba(247,241,255,.96),rgba(233,213,255,.82)),url("http://www.jy-clinic.com/common/img/main/section01_bgimg01_m.png") bottom center/contain no-repeat}}@media(max-width:640px){.program-grid::-webkit-scrollbar-track{background:#f3e8ff}.program-grid::-webkit-scrollbar-thumb{background:#7c3aed}.program-card{background:linear-gradient(180deg,#c084fc,#6d28d9)}.program-card div{background:linear-gradient(180deg,rgba(124,58,237,.08) 0%,rgba(124,58,237,.5) 54%,rgba(76,29,149,.88) 100%)}}
`;

const aboutCss = `
.about-story{max-width:1180px;margin:0 auto 60px}.about-hero-text{text-align:center;max-width:900px;margin:0 auto 46px}.about-hero-text h2{font-size:48px;line-height:1.18;margin:12px 0 18px;color:var(--red-dark)}.about-hero-text p:not(.eyebrow){font-size:19px;line-height:1.85;color:var(--muted)}.doctor-panel{display:grid;grid-template-columns:330px 1fr;gap:42px;align-items:center;padding:44px;background:linear-gradient(135deg,#f7f1ff,#fff);border:1px solid var(--line);box-shadow:0 24px 54px rgba(124,58,237,.12)}.doctor-photo{width:270px;height:270px;border-radius:50%;overflow:hidden;background:#fff;border:10px solid #fff;box-shadow:0 18px 40px rgba(76,29,149,.16);justify-self:center}.doctor-photo img{width:100%;height:100%;object-fit:cover}.doctor-panel h3{font-size:34px;line-height:1.32;margin:8px 0 16px;color:var(--red-dark)}.doctor-panel p:not(.eyebrow){font-size:17px;line-height:1.8;color:var(--muted)}.about-quote{margin:34px 0;padding:40px 48px;background:linear-gradient(135deg,#6d28d9,#a855f7);color:#fff;text-align:center}.about-quote p{max-width:860px;margin:0 auto;font-size:28px;font-weight:900;line-height:1.45}.about-feature-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}.about-feature-grid article{background:#fff;border:1px solid var(--line);overflow:hidden}.about-feature-grid img{width:100%;height:210px;object-fit:cover}.about-feature-grid div{padding:26px}.about-feature-grid b{display:inline-block;margin-bottom:14px;color:var(--red);font-size:22px}.about-feature-grid h3{font-size:24px;line-height:1.35;margin:0 0 12px;color:var(--red-dark)}.about-feature-grid p{margin:0;color:var(--muted);line-height:1.75}.about-gallery{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:22px}.about-gallery img{width:100%;height:260px;object-fit:cover;border:1px solid var(--line)}@media(max-width:900px){.doctor-panel,.about-feature-grid,.about-gallery{grid-template-columns:1fr}.doctor-panel{padding:30px}.about-hero-text h2{font-size:36px}.doctor-panel h3{font-size:28px}.about-quote p{font-size:22px}.about-feature-grid img,.about-gallery img{height:220px}}@media(max-width:640px){.about-story{margin:0 auto 40px}.about-hero-text h2{font-size:30px}.about-hero-text p:not(.eyebrow){font-size:16px}.doctor-photo{width:220px;height:220px}.doctor-panel{gap:24px}.about-quote{padding:30px 22px}.about-feature-grid div{padding:22px}}
`;

const medicalCss = `
.medical-profile{max-width:1180px;margin:0 auto 60px}.medical-intro{text-align:center;max-width:920px;margin:0 auto 42px}.medical-intro h2{font-size:42px;line-height:1.28;margin:12px 0;color:var(--red-dark)}.doctor-card{display:grid;grid-template-columns:430px 1fr;gap:48px;align-items:start;padding:48px;background:linear-gradient(135deg,#f7f1ff,#fff);border:1px solid var(--line);box-shadow:0 24px 54px rgba(124,58,237,.12)}.doctor-portrait{background:#fff;border:1px solid var(--line);overflow:hidden}.doctor-portrait img{width:100%;height:620px;object-fit:cover;object-position:center top}.doctor-bio h3{font-size:40px;margin:18px 0 14px;color:var(--red-dark)}.doctor-bio>p{font-size:17px;line-height:1.82;color:var(--muted);margin:0 0 28px}.credential-list{display:grid;gap:9px;grid-template-columns:1fr 1fr}.credential-list p{position:relative;margin:0;padding:13px 14px 13px 30px;background:#fff;border:1px solid var(--line);color:#5f4c70;line-height:1.55;font-size:14px}.credential-list p:before{content:"";position:absolute;left:14px;top:22px;width:6px;height:6px;border-radius:50%;background:var(--red)}@media(max-width:1000px){.doctor-card{grid-template-columns:1fr}.doctor-portrait img{height:auto;max-height:720px}.credential-list{grid-template-columns:1fr}.medical-intro h2{font-size:34px}.doctor-bio h3{font-size:34px}}@media(max-width:640px){.medical-profile{margin-bottom:40px}.doctor-card{padding:26px}.medical-intro h2{font-size:28px}.doctor-bio h3{font-size:30px}.credential-list p{font-size:13px}}
`;

const panoramaCss = `
.panorama-page{max-width:1180px;margin:0 auto 60px}.panorama-head{text-align:center;max-width:920px;margin:0 auto 42px}.panorama-head h2{font-size:44px;line-height:1.25;margin:12px 0 18px;color:var(--red-dark)}.panorama-head p:not(.eyebrow){font-size:18px;line-height:1.8;color:var(--muted)}.panorama-hero-img{overflow:hidden;border:1px solid var(--line);box-shadow:0 24px 54px rgba(124,58,237,.12);margin-bottom:24px}.panorama-hero-img img{width:100%;height:460px;object-fit:cover}.panorama-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}.panorama-grid article{background:#fff;border:1px solid var(--line);overflow:hidden}.panorama-grid img{width:100%;height:220px;object-fit:cover}.panorama-grid div{padding:24px}.panorama-grid b{display:inline-block;margin-bottom:12px;color:var(--red);font-size:22px}.panorama-grid h3{font-size:22px;line-height:1.35;margin:0 0 12px;color:var(--red-dark)}.panorama-grid p{margin:0;color:var(--muted);line-height:1.75}@media(max-width:900px){.panorama-grid{grid-template-columns:1fr}.panorama-head h2{font-size:34px}.panorama-hero-img img{height:320px}.panorama-grid img{height:260px}}@media(max-width:640px){.panorama-page{margin-bottom:40px}.panorama-head h2{font-size:29px}.panorama-head p:not(.eyebrow){font-size:16px}.panorama-hero-img img,.panorama-grid img{height:220px}.panorama-grid div{padding:22px}}
`;

const guideCss = `
.guide-page{max-width:1180px;margin:0 auto 60px}.guide-hero{position:relative;min-height:520px;display:grid;align-items:end;overflow:hidden;border:1px solid var(--line);box-shadow:0 24px 54px rgba(124,58,237,.12)}.guide-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.guide-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(76,29,149,.82),rgba(124,58,237,.48),rgba(255,255,255,.08))}.guide-hero>div{position:relative;z-index:1;max-width:720px;padding:58px;color:#fff}.guide-hero .eyebrow{color:#f3e8ff}.guide-hero h2{font-size:46px;line-height:1.22;margin:12px 0 18px}.guide-hero p:not(.eyebrow){font-size:19px;line-height:1.8;color:#f6efff}.hours-panel{margin-top:28px;padding:42px;background:#fff;border:1px solid var(--line)}.hours-panel h3{font-size:38px;margin:10px 0 28px;color:var(--red-dark)}.hours-list{display:grid;gap:14px}.hours-list div{display:grid;grid-template-columns:220px 1fr 1.2fr;gap:18px;align-items:center;padding:22px;background:#f7f1ff;border:1px solid var(--line)}.hours-list b{font-size:18px;color:var(--red-dark)}.hours-list span{font-size:22px;font-weight:900;color:var(--red)}.hours-list em{font-style:normal;color:var(--muted);line-height:1.55}@media(max-width:900px){.guide-hero{min-height:430px}.guide-hero>div{padding:40px}.guide-hero h2{font-size:34px}.hours-list div{grid-template-columns:1fr}.hours-panel h3{font-size:32px}}@media(max-width:640px){.guide-page{margin-bottom:40px}.guide-hero{min-height:380px}.guide-hero>div{padding:30px 22px}.guide-hero h2{font-size:28px}.guide-hero p:not(.eyebrow){font-size:16px}.hours-panel{padding:28px 20px}.hours-list span{font-size:19px}}
`;

const liftingMainCss = `
.lifting-main-detail{max-width:1080px;margin:0 auto 62px;overflow:hidden;background:#fff;border:1px solid var(--line);box-shadow:0 30px 70px rgba(124,58,237,.14)}.lifting-main-hero{display:grid;grid-template-columns:1.05fr .95fr;gap:26px;align-items:center;min-height:560px;padding:64px 58px;background:radial-gradient(circle at 78% 22%,rgba(255,255,255,.85),rgba(255,255,255,0) 30%),linear-gradient(135deg,#6d28d9 0%,#a855f7 48%,#efe3ff 100%);color:#fff}.lifting-main-hero .eyebrow{color:#f3e8ff}.lifting-main-hero h2{font-size:52px;line-height:1.12;margin:14px 0 20px;letter-spacing:0}.lifting-main-hero p:not(.eyebrow){font-size:19px;line-height:1.8;color:#fbf8ff}.lifting-hero-tags{display:flex;flex-wrap:wrap;gap:9px;margin-top:28px}.lifting-hero-tags span{padding:9px 14px;border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.16);font-weight:900;font-size:12px}.lifting-main-visual{position:relative;min-height:430px;display:grid;place-items:end center}.lifting-main-visual:before{content:"";position:absolute;width:84%;aspect-ratio:1/1;border-radius:50%;background:rgba(255,255,255,.38)}.lifting-main-visual img{position:relative;max-height:430px;object-fit:contain;filter:drop-shadow(0 26px 32px rgba(76,29,149,.28))}.lifting-main-visual strong{position:absolute;right:0;bottom:4px;font-size:118px;line-height:1;color:rgba(255,255,255,.2);font-family:Georgia,serif}.lifting-proof{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:48px;background:#fbf8ff}.lifting-proof article{padding:32px;background:#fff;border:1px solid var(--line)}.lifting-proof h3,.lifting-solution h3,.lifting-reason-head h3{font-size:30px;line-height:1.28;margin:10px 0 14px;color:var(--red-dark)}.lifting-proof p:not(.eyebrow),.lifting-solution p,.lifting-reason-head p,.lifting-point-grid p{color:var(--muted);line-height:1.75}.lifting-solution{display:grid;grid-template-columns:.9fr 1.1fr;gap:30px;align-items:start;padding:54px 58px;background:linear-gradient(135deg,#f7f1ff,#fff)}.lifting-solution ul{display:grid;gap:12px;margin:0;padding:0;list-style:none}.lifting-solution li{position:relative;padding:18px 18px 18px 46px;background:#fff;border:1px solid var(--line);color:#5f4c70;line-height:1.6}.lifting-solution li:before{content:"";position:absolute;left:20px;top:25px;width:9px;height:9px;border-radius:50%;background:var(--red)}.lifting-reason-head{text-align:center;padding:58px 58px 30px;background:#fff}.lifting-reason-head p{max-width:820px;margin:0 auto}.lifting-point-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;padding:0 48px 54px;background:#fff}.lifting-point-grid article{min-height:260px;padding:24px 20px;background:linear-gradient(180deg,#fff,#f7f1ff);border:1px solid var(--line)}.lifting-point-grid b{display:inline-block;margin-bottom:18px;color:var(--red);font-weight:900}.lifting-point-grid h4{font-size:20px;line-height:1.35;margin:0 0 12px;color:var(--red-dark)}.lifting-signature{padding:34px;text-align:center;background:linear-gradient(135deg,#4c1d95,#7c3aed,#a855f7);color:#fff;font-size:22px;font-weight:900;letter-spacing:2px}@media(max-width:1100px){.lifting-main-detail{max-width:92vw}.lifting-main-hero,.lifting-proof,.lifting-solution{grid-template-columns:1fr}.lifting-main-hero h2{font-size:42px}.lifting-main-visual{min-height:330px}.lifting-main-visual img{max-height:330px}.lifting-point-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:640px){.lifting-main-detail{max-width:none;margin-left:-20px;margin-right:-20px}.lifting-main-hero,.lifting-proof,.lifting-solution,.lifting-reason-head{padding:34px 22px}.lifting-main-hero h2{font-size:31px}.lifting-main-hero p:not(.eyebrow){font-size:16px}.lifting-proof h3,.lifting-solution h3,.lifting-reason-head h3{font-size:25px}.lifting-point-grid{grid-template-columns:1fr;padding:0 22px 36px}.lifting-point-grid article{min-height:auto}.lifting-signature{font-size:17px;letter-spacing:1px}}
`;

const multiDoctorCss = `
.medical-profile .doctor-card+.doctor-card{margin-top:34px}.medical-profile .doctor-card:nth-of-type(even){background:linear-gradient(135deg,#fff,#f7f1ff)}.doctor-portrait img[src*="doctor_ydy"]{object-fit:contain;background:#ededeb}@media(max-width:640px){.medical-profile .doctor-card+.doctor-card{margin-top:24px}.doctor-portrait img[src*="doctor_ydy"]{max-height:620px}}
`;

const mobileMenuCss = `
@media(max-width:1100px){body.menu-open{overflow:hidden}.site-header{position:sticky;top:0;z-index:40;height:76px;min-height:76px;padding:12px 16px;background:rgba(251,248,255,.88);backdrop-filter:blur(16px);box-shadow:0 10px 30px rgba(76,29,149,.08)}.nav-toggle{position:relative;display:grid;place-items:center;width:46px;height:46px;margin-left:auto;padding:0;border:1px solid rgba(124,58,237,.2);border-radius:50%;background:#fff;color:var(--red);box-shadow:0 10px 24px rgba(124,58,237,.12);z-index:45}.nav-toggle span{grid-area:1/1;width:20px;height:2px;border-radius:999px;background:currentColor;transition:transform .22s ease,opacity .18s ease}.nav-toggle span:nth-child(1){transform:translateY(-7px)}.nav-toggle span:nth-child(3){transform:translateY(7px)}.nav-toggle[aria-expanded="true"] span:nth-child(1){transform:rotate(45deg)}.nav-toggle[aria-expanded="true"] span:nth-child(2){opacity:0}.nav-toggle[aria-expanded="true"] span:nth-child(3){transform:rotate(-45deg)}.primary-nav{position:fixed;display:block;top:86px;left:14px;right:14px;bottom:14px;z-index:39;overflow:auto;overscroll-behavior:contain;padding:72px 14px 18px;border:1px solid rgba(216,196,245,.9);border-radius:24px;background:linear-gradient(180deg,rgba(255,255,255,.96),rgba(247,241,255,.98));box-shadow:0 28px 80px rgba(76,29,149,.25);opacity:0;pointer-events:none;transform:translateY(-10px) scale(.98);transition:opacity .22s ease,transform .22s ease}.primary-nav.open{opacity:1;pointer-events:auto;transform:translateY(0) scale(1)}.primary-nav:before{content:"MENU";position:absolute;top:22px;left:22px;color:var(--red);font-size:12px;font-weight:900;letter-spacing:2px}.primary-nav:after{content:"JY Mongolian";position:absolute;top:20px;right:22px;color:#9b84b7;font-size:12px;font-weight:800}.primary-nav ul{display:grid;gap:12px;margin:0;padding:0;list-style:none}.primary-nav li{position:relative;overflow:hidden;border:1px solid rgba(216,196,245,.9);border-radius:18px;background:#fff;box-shadow:0 12px 30px rgba(76,29,149,.08)}.primary-nav li>a{position:relative;display:flex;align-items:center;justify-content:space-between;min-height:54px;padding:16px 18px;color:var(--red-dark);font-size:16px;font-weight:900}.primary-nav li>a:after{content:"›";display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#f3e8ff;color:var(--red);font-size:22px;line-height:1}.primary-nav li.active>a{background:linear-gradient(135deg,#6d28d9,#a855f7);color:#fff}.primary-nav li.active>a:after{background:rgba(255,255,255,.18);color:#fff}.mega{position:static;display:flex;flex-wrap:wrap;gap:8px;min-width:0;padding:0 14px 16px;border:0;box-shadow:none;transform:none;background:transparent}.primary-nav li:hover .mega{display:flex}.mega a{display:inline-flex;align-items:center;min-height:34px;padding:8px 11px;border:1px solid #e5d5fb;border-radius:999px;background:#fbf8ff;color:#604d73;font-size:13px;line-height:1.25}.mega a:hover{background:#f3e8ff;color:var(--red)}.lang{margin-left:8px}.quick{z-index:10}}@media(max-width:640px){.site-header{height:70px;min-height:70px;padding:10px 14px}.brand-mark{width:46px;height:46px;font-size:22px}.brand strong{max-width:230px;font-size:12px}.nav-toggle{width:44px;height:44px}.primary-nav{top:78px;left:10px;right:10px;bottom:10px;padding:66px 10px 14px;border-radius:22px}.primary-nav ul{gap:10px}.primary-nav li{border-radius:16px}.primary-nav li>a{min-height:50px;padding:14px 15px;font-size:15px}.mega{gap:7px;padding:0 12px 14px}.mega a{font-size:12px;min-height:32px;padding:7px 10px}.primary-nav:before{left:18px}.primary-nav:after{right:18px}}
`;

const modernSiteCss = `
body{background:linear-gradient(180deg,#fbf8ff 0%,#fff 48%,#f7f1ff 100%)}.site-header{box-shadow:0 10px 32px rgba(76,29,149,.08)}.brand-mark,.lang a,.lang strong,.btn,.subnav a,.quick a{border-radius:8px}.home-hero,.sub-hero{position:relative;overflow:hidden}.home-hero:after,.sub-hero:after{content:"";position:absolute;inset:auto 6vw 0;height:1px;background:linear-gradient(90deg,transparent,rgba(124,58,237,.28),transparent)}.hero-copy,.sub-hero>div{position:relative;z-index:1}.btn,.program-card a,.consult button{border-radius:8px;transition:transform .2s ease,box-shadow .2s ease}.btn:hover,.program-card a:hover,.consult button:hover{transform:translateY(-2px);box-shadow:0 14px 28px rgba(124,58,237,.18)}.program-card,.detail-card,.consult,.info-list div,.notice-list article,.beauty-detail,.doctor-card,.about-feature-grid article,.panorama-grid article,.hours-panel,.lifting-main-detail,.lifting-proof article,.lifting-solution li,.lifting-point-grid article{border-radius:8px}.program-card{box-shadow:0 18px 45px rgba(76,29,149,.12)}.program-card img{transition:transform .4s ease}.program-card:hover img{transform:scale(1.04)}.subnav{gap:10px}.subnav a{box-shadow:0 8px 18px rgba(76,29,149,.06)}.detail-card,.info-list div,.notice-list article,.about-feature-grid article,.panorama-grid article,.hours-panel{box-shadow:0 16px 38px rgba(76,29,149,.08)}.lead-panel h2,.home-hero h1,.sub-hero h1{letter-spacing:0}.quick a{box-shadow:0 12px 26px rgba(76,29,149,.18)}@media(max-width:1100px){.primary-nav{top:82px;left:12px;right:12px;bottom:auto;max-height:calc(100vh - 96px);padding:58px 12px 14px;border-radius:8px}.primary-nav ul{gap:9px}.primary-nav li{border-radius:8px}.primary-nav li>a{min-height:52px;border-radius:8px}.primary-nav .mega{display:none!important}.primary-nav:before{top:20px}.primary-nav:after{top:19px}.nav-toggle{border-radius:8px}.primary-nav.open{display:block}.quick{z-index:15}}@media(max-width:640px){.primary-nav{top:76px;left:8px;right:8px;max-height:calc(100vh - 88px);padding:54px 10px 12px;border-radius:8px}.primary-nav li>a{font-size:15px}.program-card{border-radius:8px}.home-hero,.sub-hero{padding-top:46px}.content-wrap{padding-top:38px}}
`;

const modernUpgradeCss = `
:root{--surface:#ffffff;--surface-soft:#fbf8ff;--shadow:0 22px 55px rgba(76,29,149,.12);--shadow-soft:0 12px 32px rgba(76,29,149,.08)}body{color:#1f1730;background:linear-gradient(180deg,#fbf8ff 0%,#fff 42%,#f8f4ff 100%)}.site-header{height:82px;padding:0 5vw;background:rgba(255,255,255,.82);border-bottom:1px solid rgba(216,196,245,.72);box-shadow:0 14px 42px rgba(76,29,149,.08)}.brand{gap:12px}.brand-mark{width:54px;height:54px;background:#fff;border:1px solid rgba(124,58,237,.32);box-shadow:0 10px 28px rgba(124,58,237,.12)}.brand strong{font-weight:900}.primary-nav li>a{padding:31px 14px}.mega{border:1px solid rgba(216,196,245,.9);border-top:3px solid var(--red);border-radius:8px;box-shadow:0 24px 60px rgba(76,29,149,.16)}.home-hero{min-height:720px;padding:104px 7vw 92px;background:linear-gradient(90deg,rgba(247,241,255,.98) 0%,rgba(233,213,255,.78) 42%,rgba(255,255,255,.08) 72%),url("http://www.jy-clinic.com/common/img/main/section01_bgimg01.png") center right/contain no-repeat}.hero-copy{max-width:720px}.home-hero h1,.sub-hero h1{font-weight:900}.home-hero h1{font-size:64px;line-height:1.04}.home-hero p:not(.eyebrow),.sub-hero p:not(.eyebrow){max-width:680px;color:#5e4d70}.hero-actions{gap:10px}.btn{padding:15px 22px;border:1px solid rgba(124,58,237,.22);box-shadow:var(--shadow-soft)}.btn.primary{background:linear-gradient(135deg,#5b21b6,#8b5cf6);border-color:transparent}.btn.ghost{background:rgba(255,255,255,.86)}.intro-band{box-shadow:inset 0 1px rgba(255,255,255,.24)}.program-grid{padding:88px 7vw;gap:22px;background:linear-gradient(180deg,#fff,#fbf8ff)}.program-card{min-height:420px;border:1px solid rgba(216,196,245,.72);box-shadow:var(--shadow);background:#7c3aed}.program-card img{opacity:.72}.program-card div{padding:32px;background:linear-gradient(180deg,rgba(76,29,149,.04) 0%,rgba(76,29,149,.56) 54%,rgba(37,18,70,.9) 100%)}.program-card h3{font-size:32px;line-height:1.15}.program-card a{padding:12px 16px;border:1px solid rgba(255,255,255,.72);box-shadow:0 12px 28px rgba(37,18,70,.18)}.sub-hero{min-height:390px;padding:76px 7vw 70px;background:linear-gradient(90deg,rgba(247,241,255,.98),rgba(233,213,255,.72),rgba(255,255,255,.08)),var(--hero) center right/contain no-repeat}.subnav{padding:16px 7vw;background:rgba(255,255,255,.82);backdrop-filter:blur(12px)}.subnav a{padding:10px 15px;border-color:rgba(216,196,245,.9);background:#fff;font-weight:800}.content-wrap{padding:72px 7vw;background:linear-gradient(180deg,#fbf8ff,#fff)}.lead-panel{margin-bottom:38px}.lead-panel h2{font-size:44px;color:var(--red-dark);font-weight:900}.lead-panel p:not(.eyebrow){color:#5f4c70}.detail-grid{gap:18px}.detail-card,.consult,.info-list div,.notice-list article{border-color:rgba(216,196,245,.86);box-shadow:var(--shadow-soft)}.consult{background:linear-gradient(135deg,#fff,#f7f1ff);border-top:0}.consult h2{color:var(--red-dark)}.consult input,.consult select,.consult textarea{border-radius:8px;border-color:rgba(216,196,245,.9)}.consult button{background:linear-gradient(135deg,#5b21b6,#8b5cf6)}.footer{background:linear-gradient(135deg,#2e1065,#5b21b6,#7c3aed)}@media(max-width:1100px){.site-header{height:74px;min-height:74px;padding:10px 18px}.home-hero{min-height:640px;padding:76px 24px;background:linear-gradient(rgba(247,241,255,.96),rgba(233,213,255,.78)),url("http://www.jy-clinic.com/common/img/main/section01_bgimg01_m.png") bottom center/contain no-repeat}.home-hero h1{font-size:44px}.program-grid{padding:50px 20px}.program-card{min-height:390px}.sub-hero{min-height:330px;padding:58px 24px}.content-wrap{padding:52px 24px}.lead-panel h2{font-size:36px}}@media(max-width:640px){.site-header{height:68px;min-height:68px}.brand-mark{width:42px;height:42px}.home-hero{min-height:590px;padding:54px 20px 44px}.home-hero h1{font-size:34px}.hero-actions{grid-template-columns:1fr}.program-grid{padding:30px 20px 36px}.program-card{min-height:370px}.program-card div{padding:24px}.program-card h3{font-size:28px}.sub-hero{min-height:300px;padding:50px 20px}.subnav{padding:13px 20px}.content-wrap{padding:38px 20px}.lead-panel h2{font-size:30px}.quick{grid-template-columns:repeat(3,1fr);gap:6px}.quick a{padding:12px 8px;font-size:12px}}
`;

const mobileAccordionCss = `
@media(max-width:1100px){.primary-nav .mega{display:none!important}.primary-nav li.submenu-open .mega{display:flex!important;padding-top:0}.primary-nav li.submenu-open>a:after{transform:rotate(90deg);background:#ede0ff}.primary-nav li.submenu-open>a{color:var(--red);background:#fbf8ff}.primary-nav li.active.submenu-open>a{color:#fff;background:linear-gradient(135deg,#6d28d9,#a855f7)}.primary-nav li.active.submenu-open>a:after{background:rgba(255,255,255,.18);color:#fff}.primary-nav li.submenu-open{box-shadow:0 18px 42px rgba(76,29,149,.16)}}@media(max-width:640px){.primary-nav li.submenu-open .mega{gap:7px;padding-bottom:14px}}
`;

const heroRedesignCss = `
.home-hero{isolation:isolate;display:block;min-height:720px;padding:86px 7vw;background:radial-gradient(circle at 15% 18%,rgba(168,85,247,.18),transparent 28%),linear-gradient(135deg,#fbf8ff 0%,#f3e8ff 48%,#fff 100%)}.hero-carousel{display:grid;grid-template-columns:minmax(0,1fr) minmax(340px,.78fr);gap:48px;align-items:center}.hero-slide-stats{grid-column:1}.hero-slide-visual{grid-column:2;grid-row:1 / span 2}.home-hero:before{content:"";position:absolute;right:4vw;top:90px;width:34vw;max-width:520px;aspect-ratio:1;border-radius:8px;background:linear-gradient(135deg,rgba(124,58,237,.16),rgba(255,255,255,.38));transform:rotate(8deg);z-index:-1}.home-hero:after{inset:auto 7vw 38px;height:1px}.hero-copy{max-width:720px}.home-hero .eyebrow{display:inline-flex;align-items:center;gap:10px;padding:8px 12px;border:1px solid rgba(124,58,237,.18);border-radius:8px;background:rgba(255,255,255,.76);box-shadow:0 10px 24px rgba(76,29,149,.08)}.home-hero h1{max-width:720px;margin:20px 0 22px;font-size:62px;line-height:1.03;color:#1f1730}.home-hero p:not(.eyebrow){max-width:620px;font-size:19px;color:#604d73}.hero-actions{display:flex;flex-wrap:wrap;margin-top:34px}.hero-actions .btn{min-width:190px;text-align:center}.hero-stats{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}.hero-stats span{display:inline-flex;align-items:center;gap:8px;min-height:46px;padding:8px 14px;border:1px solid rgba(216,196,245,.92);border-radius:8px;background:rgba(255,255,255,.74);box-shadow:0 10px 24px rgba(76,29,149,.08);color:#604d73;font-size:13px;font-weight:800}.hero-stats b{color:#6d28d9;font-size:18px}.hero-showcase{position:relative;min-height:520px}.showcase-card.main{position:absolute;inset:20px 0 34px 38px;overflow:hidden;border:1px solid rgba(216,196,245,.9);border-radius:8px;background:linear-gradient(180deg,#fff,#f7f1ff);box-shadow:0 34px 80px rgba(76,29,149,.18)}.showcase-card.main:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.04),rgba(109,40,217,.16))}.showcase-card.main img{position:absolute;right:0;bottom:0;width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 24px 38px rgba(76,29,149,.2))}.showcase-card.floating{position:absolute;left:0;bottom:58px;width:min(270px,70%);padding:20px;border:1px solid rgba(255,255,255,.72);border-radius:8px;background:rgba(255,255,255,.78);backdrop-filter:blur(16px);box-shadow:0 24px 54px rgba(76,29,149,.18)}.showcase-card.floating strong{display:block;color:#4c1d95;font-size:20px}.showcase-card.floating span{display:block;margin-top:8px;color:#6d5a7d;font-size:13px;font-weight:800;line-height:1.45}.showcase-pill{position:absolute;right:18px;top:46px;padding:11px 15px;border-radius:8px;background:linear-gradient(135deg,#5b21b6,#8b5cf6);color:#fff;font-size:12px;font-weight:900;letter-spacing:1px;box-shadow:0 18px 40px rgba(76,29,149,.24)}@media(max-width:1100px){.home-hero{min-height:auto;padding:70px 24px 46px;background:linear-gradient(180deg,#fbf8ff,#f3e8ff 58%,#fff)}.hero-carousel{grid-template-columns:1fr;gap:18px}.hero-slide-visual{grid-column:auto;grid-row:auto}.home-hero:before{right:-70px;top:120px;width:280px}.home-hero h1{font-size:44px}.hero-showcase{min-height:430px;max-width:520px;width:100%;margin:0 auto}.showcase-card.main{inset:0 0 26px 0}.showcase-card.floating{left:14px;bottom:42px}.showcase-pill{right:14px;top:18px}}@media(max-width:640px){.home-hero{padding:18px 0 28px;overflow:hidden}.home-hero:before{display:none}.hero-carousel{display:flex;gap:0;width:300%;animation:hero-mobile-slide 12s infinite ease-in-out}.hero-slide{flex:0 0 33.333%;min-height:430px;padding:28px 18px;display:flex;align-items:center}.hero-slide-copy{align-items:flex-start}.hero-slide-stats{align-items:center}.hero-slide-visual{align-items:center}.home-hero h1{font-size:32px}.home-hero p:not(.eyebrow){font-size:16px}.hero-actions{display:grid;grid-template-columns:1fr;width:100%}.hero-actions .btn{width:100%;min-width:0}.hero-stats{display:grid;grid-template-columns:1fr;width:100%;margin:0}.hero-stats span{min-height:76px;font-size:14px}.hero-stats b{font-size:24px}.hero-showcase{min-height:360px;width:100%}.showcase-card.main{inset:0 0 20px}.showcase-card.floating{width:calc(100% - 28px);left:14px;bottom:32px}.showcase-pill{font-size:10px}.home-hero:after{display:none}}@keyframes hero-mobile-slide{0%,27%{transform:translateX(0)}33%,60%{transform:translateX(-33.333%)}66%,93%{transform:translateX(-66.666%)}100%{transform:translateX(0)}}
`;

const mobileMenuRedesignCss = `
@media(max-width:1100px){.primary-nav{top:74px;left:0;right:0;bottom:0;max-height:none;padding:66px 16px 22px;border:0;border-radius:0;background:linear-gradient(180deg,rgba(32,12,70,.97),rgba(76,29,149,.95));box-shadow:none;color:#fff}.primary-nav:before{content:"JY MENU";top:24px;left:18px;color:#fff;font-size:13px;letter-spacing:2px}.primary-nav:after{content:"Programs";top:24px;right:18px;color:rgba(255,255,255,.62);font-size:12px}.primary-nav ul{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.primary-nav li{border:1px solid rgba(255,255,255,.16);border-radius:8px;background:rgba(255,255,255,.08);box-shadow:0 14px 32px rgba(18,7,42,.24);backdrop-filter:blur(12px);overflow:visible}.primary-nav li>a{min-height:56px;padding:14px 14px;color:#fff;font-size:14px}.primary-nav li>a:after{width:26px;height:26px;background:rgba(255,255,255,.16);color:#fff;transition:transform .2s ease,background .2s ease}.primary-nav li.active>a{background:transparent;color:#fff}.primary-nav li.active{background:linear-gradient(135deg,rgba(124,58,237,.95),rgba(168,85,247,.92));border-color:rgba(255,255,255,.24)}.primary-nav li.submenu-open{grid-column:1/-1;background:rgba(255,255,255,.13);border-color:rgba(255,255,255,.28);box-shadow:0 18px 46px rgba(18,7,42,.34)}.primary-nav li.submenu-open>a{background:transparent!important;color:#fff}.primary-nav li.submenu-open>a:after{transform:rotate(90deg);background:rgba(255,255,255,.22);color:#fff}.primary-nav li.submenu-open .mega{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding:0 12px 14px}.primary-nav .mega a{display:flex;min-height:38px;padding:9px 10px;border:1px solid rgba(255,255,255,.16);border-radius:8px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.9);font-size:12px;font-weight:800}.primary-nav .mega a:hover{background:rgba(255,255,255,.18);color:#fff}.nav-toggle{border-radius:8px;background:#fff;color:#6d28d9}.quick{z-index:10}}@media(max-width:640px){.primary-nav{top:68px;padding:58px 12px 16px}.primary-nav ul{gap:8px}.primary-nav li>a{min-height:52px;padding:12px;font-size:13px}.primary-nav li.submenu-open .mega{grid-template-columns:1fr;gap:7px;padding:0 10px 12px}.primary-nav .mega a{font-size:12px;min-height:36px}.primary-nav:before{top:20px;left:14px}.primary-nav:after{top:20px;right:14px}}
`;

const heroCardStackCss = `
.home-hero{display:grid;place-items:center;min-height:520px;padding:46px 4vw 34px;background:linear-gradient(180deg,#fff 0%,#fbf8ff 100%);overflow:hidden}.home-hero:before,.home-hero:after{display:none}.hero-card-stack{position:relative;width:min(100%,820px);height:390px;margin:0 auto}.hero-image-card{position:absolute;top:36px;left:50%;width:250px;height:310px;overflow:hidden;border-radius:8px;background:#ddd;box-shadow:0 22px 44px rgba(36,21,54,.22);transform:translateX(-50%);transition:transform .35s ease,opacity .35s ease}.hero-image-card img{width:100%;height:100%;object-fit:cover}.hero-image-card:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(0,0,0,.58) 100%)}.hero-image-card span,.hero-image-card div{position:absolute;left:16px;right:16px;bottom:18px;z-index:1;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.35)}.hero-image-card span{font-size:15px;font-weight:900;line-height:1.25}.hero-image-card p{margin:0 0 8px;font-size:11px;font-weight:900;letter-spacing:1px;color:#fff}.hero-image-card h1{margin:0;font-size:21px;line-height:1.18;color:#fff}.hero-image-card button{position:absolute;top:12px;right:12px;z-index:2;width:34px;height:34px;border:0;border-radius:50%;background:rgba(255,255,255,.7);color:#fff;font-size:17px;box-shadow:0 10px 20px rgba(0,0,0,.14)}.card-main{z-index:5;top:0;width:300px;height:370px}.card-left{z-index:4;transform:translateX(-98%);opacity:.76;filter:saturate(.86)}.card-right{z-index:4;transform:translateX(-2%);opacity:.76;filter:saturate(.86)}.card-back-left{z-index:3;transform:translateX(-145%) scale(.92);opacity:.36;filter:blur(.3px) saturate(.8)}.card-back-right{z-index:3;transform:translateX(45%) scale(.92);opacity:.36;filter:blur(.3px) saturate(.8)}.hero-dots{display:flex;justify-content:center;gap:8px;margin-top:8px}.hero-dots span{width:8px;height:8px;border-radius:999px;background:#d4d1da}.hero-dots .active{width:20px;background:#6d1f4f}@media(max-width:640px){.home-hero{min-height:430px;padding:34px 0 26px}.hero-card-stack{width:100%;height:330px}.hero-image-card{width:200px;height:258px;top:34px;border-radius:8px}.card-main{top:0;width:230px;height:306px}.card-left{transform:translateX(-96%)}.card-right{transform:translateX(-4%)}.card-back-left{transform:translateX(-138%) scale(.9)}.card-back-right{transform:translateX(38%) scale(.9)}.hero-image-card h1{font-size:18px}.hero-image-card span{font-size:13px}.hero-dots{margin-top:0}}
`;

const heroMobileScrollCss = `
@media(max-width:640px){.home-hero{display:block;min-height:0;padding:28px 0 24px;overflow:hidden}.hero-card-stack{position:relative;display:flex;gap:14px;width:100%;height:auto;margin:0;overflow-x:auto;overflow-y:hidden;padding:0 20px 18px;scroll-snap-type:x mandatory;scroll-padding-left:20px;-webkit-overflow-scrolling:touch}.hero-card-stack::-webkit-scrollbar{display:none}.hero-image-card,.card-main,.card-left,.card-right,.card-back-left,.card-back-right{position:relative;top:auto;left:auto;flex:0 0 78vw;width:78vw;height:300px;transform:none;opacity:1;filter:none;scroll-snap-align:center;box-shadow:0 18px 42px rgba(36,21,54,.18)}.hero-image-card:first-child{margin-left:2px}.hero-image-card:last-child{margin-right:20px}.hero-image-card h1{font-size:20px}.hero-image-card span{font-size:15px}.hero-dots{margin-top:0}.hero-dots span{background:#d7d2df}.hero-dots .active{background:#7c3aed}}
`;

const heroCarouselCss = `
@media(max-width:640px){.home-hero{display:grid;place-items:center;min-height:390px;padding:28px 0 24px;overflow:hidden}.hero-card-stack{position:relative;display:block;width:100%;height:318px;margin:0 auto;overflow:visible;padding:0}.hero-image-card,.card-main,.card-left,.card-right,.card-back-left,.card-back-right{position:absolute;top:34px;left:50%;flex:none;width:220px;height:270px;overflow:hidden;border-radius:8px;transition:transform .55s cubic-bezier(.22,.61,.36,1),opacity .55s ease,filter .55s ease;box-shadow:0 18px 42px rgba(36,21,54,.2);scroll-snap-align:none}.card-main{z-index:5;top:0;width:250px;height:314px;transform:translateX(-50%) scale(1);opacity:1;filter:none}.card-left{z-index:4;transform:translateX(-104%) scale(.88);opacity:.58;filter:saturate(.85)}.card-right{z-index:4;transform:translateX(4%) scale(.88);opacity:.58;filter:saturate(.85)}.card-back-left{z-index:3;transform:translateX(-144%) scale(.78);opacity:.22;filter:blur(.4px) saturate(.75)}.card-back-right{z-index:3;transform:translateX(44%) scale(.78);opacity:.22;filter:blur(.4px) saturate(.75)}.hero-image-card h1{font-size:19px}.hero-image-card span{font-size:13px}.hero-dots{margin-top:2px}.hero-dots span{background:#d7d2df}.hero-dots .active{background:#7c3aed}}
`;

const quickReviewCss = `
.quick{grid-template-columns:repeat(3,minmax(0,1fr));width:min(520px,calc(100vw - 28px))}.quick-review{grid-column:1/-1;overflow:hidden;border:1px solid rgba(216,196,245,.9);border-radius:8px;background:rgba(255,255,255,.92);box-shadow:0 12px 26px rgba(76,29,149,.12)}.quick-review-track{display:flex;width:max-content;gap:34px;align-items:center;min-height:36px;animation:quick-review-marquee 24s linear infinite}.quick-review span{white-space:nowrap;color:#4c1d95;font-size:12px;font-weight:900}.quick-review span:after{content:"";display:inline-block;width:5px;height:5px;margin-left:34px;border-radius:50%;background:#a855f7;vertical-align:middle}.quick:hover .quick-review-track{animation-play-state:paused}@keyframes quick-review-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media(max-width:640px){.quick{left:8px;right:8px;bottom:8px;width:auto;grid-template-columns:repeat(3,1fr);gap:6px;padding:8px;background:rgba(251,248,255,.92);backdrop-filter:blur(14px);border-top:1px solid rgba(216,196,245,.85)}.quick-review{border-radius:8px}.quick-review-track{min-height:34px;gap:26px;animation-duration:20s}.quick-review span{font-size:11px}.quick-review span:after{margin-left:26px}.quick a{padding:11px 7px;font-size:11px;border-radius:8px}}
`;

const menuOverlayFixCss = `
@media(max-width:1100px){.site-header{z-index:10000!important}.nav-toggle{z-index:10002!important}.primary-nav{position:fixed!important;top:74px!important;left:0!important;right:0!important;bottom:0!important;min-height:calc(100vh - 74px)!important;max-height:none!important;z-index:9999!important;background:linear-gradient(180deg,#210c46 0%,#4c1d95 100%)!important;opacity:0;pointer-events:none}.primary-nav.open{opacity:1!important;pointer-events:auto!important;transform:none!important}.menu-open .home-hero,.menu-open .intro-band,.menu-open .program-grid,.menu-open main,.menu-open .quick{z-index:auto!important}.menu-open .hero-image-card{z-index:auto!important}}@media(max-width:640px){.primary-nav{top:68px!important;min-height:calc(100vh - 68px)!important}}
`;

const reviewShowcaseCss = `
.review-showcase{padding:70px 0 78px;background:#fff;overflow:hidden}.review-heading{max-width:1180px;margin:0 auto 26px;padding:0 6vw}.review-heading h2{margin:8px 0 0;color:#1f2937;font-size:36px;line-height:1.2;font-weight:900}.review-slider{display:flex;gap:18px;width:max-content;padding:0 6vw;animation:review-slide 28s linear infinite}.review-showcase:hover .review-slider{animation-play-state:paused}.review-big-card{width:260px;min-height:170px;padding:24px 20px;border:1px solid #ffd7df;border-radius:8px;background:#fff3f5;box-shadow:0 16px 36px rgba(124,31,65,.08);color:#6b5b6b}.review-big-card .review-avatar{float:left;display:grid;place-items:center;width:42px;height:42px;margin:0 12px 10px 0;border-radius:50%;background:#7b1e4a;color:#fff;font-size:20px;font-weight:900}.review-big-card strong{display:block;color:#5a263e;font-size:15px}.review-big-card span{display:block;margin-top:2px;color:#ffc928;letter-spacing:1px;font-size:14px}.review-big-card p{clear:both;margin:14px 0 0;font-size:14px;line-height:1.65;color:#6f6678}@keyframes review-slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media(max-width:640px){.review-showcase{padding:46px 0 54px}.review-heading{padding:0 20px}.review-heading h2{font-size:27px}.review-slider{gap:14px;padding:0 20px;animation-duration:24s}.review-big-card{width:250px;min-height:164px;padding:22px 18px}.review-big-card p{font-size:13px}}
`;

const quickContactCss = `
.quick{display:grid;grid-template-columns:1fr;width:auto;right:18px;bottom:18px;gap:10px;padding:0;background:transparent;border:0}.quick-contact-toggle,.quick-contact-close{border:0;font:inherit;cursor:pointer}.quick-contact-toggle{display:flex;align-items:center;gap:9px;justify-content:center;min-width:132px;padding:14px 18px;border-radius:999px;background:linear-gradient(135deg,#7b1e4a,#9d2b65);color:#fff;font-weight:900;box-shadow:0 16px 38px rgba(72,9,37,.28)}.quick-contact-toggle span{display:grid;place-items:center;width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.18)}.quick-contact-panel{display:none;gap:10px}.quick.open .quick-contact-panel{display:grid}.quick-contact-panel a{display:flex;align-items:center;gap:13px;min-width:260px;padding:16px 18px;border-radius:8px;background:#fff;color:#273142;font-weight:900;box-shadow:0 12px 28px rgba(72,9,37,.18)}.quick-contact-panel a span{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#fdebf1;color:#7b1e4a}.quick-contact-panel a:nth-child(2) span{background:#eef4ff;color:#4d7cff}.quick-contact-close{justify-self:end;padding:13px 20px;border-radius:999px;background:#8a2555;color:#fff;font-weight:900;box-shadow:0 12px 28px rgba(72,9,37,.2)}@media(max-width:640px){.quick{right:12px;bottom:12px;left:auto;width:auto;padding:0;background:transparent}.quick-contact-toggle{min-width:126px;padding:13px 16px}.quick-contact-panel a{min-width:260px;padding:15px 16px}.quick-contact-close{padding:12px 18px}}
`;

const reviewPurpleCss = `
.review-showcase{background:linear-gradient(180deg,#fbf8ff,#f4ecff);border-top:1px solid rgba(216,196,245,.8)}.review-heading h2{color:#21172f}.review-big-card{border-color:#d8c4f5;background:linear-gradient(180deg,#fff,#f7f1ff);box-shadow:0 18px 42px rgba(76,29,149,.12)}.review-big-card .review-avatar{background:linear-gradient(135deg,#4c1d95,#7c3aed)}.review-big-card strong{color:#4c1d95}.review-big-card p{color:#665377}.review-big-card span{color:#f5b400}
`;

const quickContactMobileCss = `
.quick-contact-toggle{background:linear-gradient(135deg,#5b21b6,#7c3aed 58%,#a855f7)!important;box-shadow:0 16px 38px rgba(76,29,149,.28)!important}.quick-contact-toggle span{background:rgba(255,255,255,.2);color:#fff}.quick-contact-panel a{color:#261340;box-shadow:0 14px 32px rgba(76,29,149,.16)}.quick-contact-panel a span{background:#f3e8ff;color:#6d28d9}.quick-contact-panel a:nth-child(2) span{background:#ede9fe;color:#7c3aed}.quick-contact-close{background:linear-gradient(135deg,#4c1d95,#7c3aed)!important;box-shadow:0 12px 28px rgba(76,29,149,.24)!important}@media(max-width:640px){.quick{position:fixed!important;left:12px!important;right:12px!important;bottom:calc(10px + env(safe-area-inset-bottom))!important;width:auto!important;z-index:9998!important;display:grid!important;grid-template-columns:1fr!important;gap:8px!important;padding:0!important;background:transparent!important;border:0!important;backdrop-filter:none!important}.quick-contact-toggle{width:100%!important;min-width:0!important;min-height:52px!important;padding:13px 18px!important;border-radius:999px!important;font-size:15px!important;letter-spacing:0!important}.quick-contact-toggle span{width:28px;height:28px;font-size:14px}.quick-contact-panel{order:-1;width:100%;gap:8px}.quick.open .quick-contact-panel{display:grid}.quick-contact-panel a{width:100%!important;min-width:0!important;min-height:54px!important;padding:14px 16px!important;border:1px solid rgba(216,196,245,.9)!important;border-radius:18px!important;background:rgba(255,255,255,.96)!important;color:#261340!important;font-size:14px!important}.quick-contact-close{justify-self:end!important;min-height:44px!important;padding:11px 18px!important;border-radius:999px!important;font-size:14px!important}}
`;

const js = `const navToggle=document.querySelector(".nav-toggle");const primaryNav=document.querySelector(".primary-nav");const isMobileNav=()=>window.matchMedia("(max-width:1100px)").matches;const closeMenu=()=>{primaryNav?.classList.remove("open");document.body.classList.remove("menu-open");navToggle?.setAttribute("aria-expanded","false");};navToggle?.addEventListener("click",()=>{const open=!primaryNav?.classList.contains("open");primaryNav?.classList.toggle("open",open);document.body.classList.toggle("menu-open",open);navToggle.setAttribute("aria-expanded",String(open));if(open){primaryNav?.querySelector("li.active")?.classList.add("submenu-open");}});primaryNav?.querySelectorAll(":scope > ul > li > a").forEach((link)=>link.addEventListener("click",(event)=>{const item=link.closest("li");const hasSubmenu=!!item?.querySelector(".mega");if(isMobileNav()&&hasSubmenu){event.preventDefault();primaryNav.querySelectorAll("li.submenu-open").forEach((openItem)=>{if(openItem!==item)openItem.classList.remove("submenu-open");});item.classList.toggle("submenu-open");}}));primaryNav?.querySelectorAll(".mega a").forEach((link)=>link.addEventListener("click",closeMenu));const heroCards=[...document.querySelectorAll(".hero-image-card")];const heroDots=[...document.querySelectorAll(".hero-dots span")];const heroPositions=["card-main","card-right","card-back-right","card-back-left","card-left"];let heroActive=0;function renderHeroCarousel(){if(!heroCards.length)return;heroCards.forEach((card,index)=>{card.classList.remove("card-main","card-left","card-right","card-back-left","card-back-right");card.classList.add(heroPositions[(index-heroActive+heroCards.length)%heroCards.length]);});heroDots.forEach((dot,index)=>dot.classList.toggle("active",index===heroActive));}renderHeroCarousel();if(heroCards.length){setInterval(()=>{heroActive=(heroActive+1)%heroCards.length;renderHeroCarousel();},3200);heroDots.forEach((dot,index)=>dot.addEventListener("click",()=>{heroActive=index;renderHeroCarousel();}));}const quick=document.querySelector(".quick");const quickToggle=document.querySelector(".quick-contact-toggle");const quickClose=document.querySelector(".quick-contact-close");quickToggle?.addEventListener("click",()=>{const open=!quick?.classList.contains("open");quick?.classList.toggle("open",open);quickToggle.setAttribute("aria-expanded",String(open));});quickClose?.addEventListener("click",()=>{quick?.classList.remove("open");quickToggle?.setAttribute("aria-expanded","false");});`;

function write(file, content) {
  const target = path.join(root, file);
  ensureDir(target);
  fs.writeFileSync(target, content, "utf8");
}

function redirects() {
  return [...pageMeta.values()]
    .map((meta) => `/${meta.group.key}/${meta.slug}.php ${pageHref(meta.group.key, meta.slug)} 301`)
    .join("\n") + "\n";
}

write("assets/css/style.css", replaceLegacyAssetUrls(css + detailCss + colorHarmonyCss + marqueeCss + mobileSliderCss + brandingCss + purpleThemeCss + aboutCss + medicalCss + multiDoctorCss + panoramaCss + guideCss + liftingMainCss + mobileMenuCss + modernSiteCss + modernUpgradeCss + mobileAccordionCss + heroRedesignCss + mobileMenuRedesignCss + heroCardStackCss + heroMobileScrollCss + heroCarouselCss + quickReviewCss + menuOverlayFixCss + reviewShowcaseCss + quickContactCss + reviewPurpleCss + quickContactMobileCss));
write("assets/js/site.js", js);
write("index.html", home());
for (const meta of pageMeta.values()) {
  write(`${meta.group.key}/${meta.slug}.html`, page(meta));
}
write("en/index.html", home());
write("_redirects", redirects());
