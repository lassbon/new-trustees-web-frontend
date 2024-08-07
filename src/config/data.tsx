import FtImage1 from "../assets/images/ftImage1.png";
import FtImage2 from "../assets/images/ftImage2.png";
import FtImage3 from "../assets/images/ftImage3.png";
import FtImage4 from "../assets/images/ftImage4.png";
import whyImage1 from "../assets/images/whyImage1.png";
import whyImage2 from "../assets/images/whyImage2.png";
import whyImage3 from "../assets/images/whyImage3.png";

import { RiHome7Line } from "react-icons/ri";
import { TbDiamond } from "react-icons/tb";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { CiSettings } from "react-icons/ci";

export const navMenuData = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "About",
    id: "About",
  },
  {
    label: "Services",
    id: "Services",
  },
  {
    label: "FAQ",
    id: "Faq",
  },
  {
    label: "Contact",
    id: "Contact",
  },
  {
    label: "Blog",
    link: "Blog",
  },
  {
    label: "Recommendations",
    link: "Recommendation",
  },
];

export const featuresData = [
  {
    img: FtImage1,
    header: "Keep Track of your Assets",
    text: "Track your assets and monitor their growth seamlessly. With MAPP the total value of your cash, investments, real estate and digital assets are organised and consolidated.",
  },
  {
    img: FtImage2,
    header: "Assign Beneficiaries",
    text: "Wealth Transfer is an essential part of your wealth journey, Don’t leave the individuals who depend on you financially stranded. Designate beneficiaries to receive your assets in your absence. ",
  },
  {
    img: FtImage3,
    header: "Plan for those you Love",
    text: "Give what you want, to whom you want, in the way and manner you want it. MAPP helps you protect the interests of your loved ones by creating by an estate plan tailored to your needs.",
  },
  {
    img: FtImage4,
    header: "Keep Tabs on your Net worth",
    text: "Monitor your wealth with precision. Our intuitive dashboard provides real-time updates on your assets, giving you the insight you need to make informed financial decisions.",
  },
];

export const whyData = [
  {
    img: whyImage1,
  },
  {
    img: whyImage2,
  },
  {
    img: whyImage3,
  },
];

export const faqData = [
  {
    question: "I have a living trust already; do i also need a will?",
    answer:
      "This is largely dependent on your estate planning objective and the kind of assets owned, some assets may be suitably planned by writing a will.",
  },
  {
    question: "When should i establish a trust?",
    answer:
      "With MAPP, you can track your assets, designate beneficiaries, and plan for those you love. You can also access our recommendations and services to find the best fit for your needs.",
  },
  {
    question: "What if I lose my device or password?",
    answer:
      "No worries! We have two-factor authentication enabled on our platform, so you can securely access your account even if you lose your device or password.",
  },
  {
    question: "Can I use MAPP with my existing bank accounts?",
    answer: "Yes, you can use MAPP with your existing bank accounts to",
  },
];

export const RecommendationData = [
  {
    header: "Single",
    text: "With minimal financial obligations, ready to accumulate wealth.",
  },
  {
    header: "Married",
    text: "Without children, with average to high living expenses.",
  },
  {
    header: "Mature Family",
    text: "With children who are growing up or have left home, both Parents are income earners in your peak earning years.",
  },
  {
    header: "Young Family",
    text: "With a home and financial obligations such as childcare (School fees), Mortgage and other living expenses.",
  },
  {
    header: "Preparing for retirement",
    text: "Homeowner with minimal financial obligation.",
  },
  {
    header: "Retiree",
    text: "You rely solely on funds and investments accumulated over time and intend to maintain your lifestyle for an estimate of 10-15 years and above.",
  },
];

export const outComeData = [
  {
    text: "There may be family dispute over my assets",
  },
  {
    text: "My assets would be passed on to my next of kin.",
  },
  {
    text: "The Government will take over my assets.",
  },
  {
    text: "My family would have access to all my assets without hitches.",
  },
];

export const sidebarData = [
  {
    label: "Home",
    link: "/Dashboard",
    icon: RiHome7Line,
  },
  {
    label: "Assets",
    link: "Assets",
    icon: TbDiamond,
  },
  {
    label: "Estate Plans",
    link: "EstatePlans",
    icon: MdOutlineRealEstateAgent,
  },
  {
    label: "settings",
    link: "settings",
    icon: CiSettings,
  },
];

export const chartData = [
  { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 350, pv: 2400, amt: 2400 },
  { name: "Mar", uv: 100, pv: 2400, amt: 2400 },
  { name: "Apr", uv: 250, pv: 2400, amt: 2400 },
  { name: "May", uv: 500, pv: 2400, amt: 2400 },
  { name: "Jun", uv: 450, pv: 2400, amt: 2400 },
  { name: "Jul", uv: 230, pv: 2400, amt: 2400 },
];

export const commonCardData = [
  {
    bgImage: "/images/commonImg1.png",
    header: "Set up a Trust",
    text: "Relieve yourself and your beneficiaries of the hassle associated with managing and transferring multiple asset classes by setting up a Trust.",
  },
  {
    bgImage: "/images/commonImg2.png",
    header: "Secure your Child’s future",
    text: "Give your children/wards a foundation for a bright future.",
  },
  {
    bgImage: "/images/commonImg4.png",
    header: "Appoint a nominee",
    text: "Appoint a Nominee to transfer specific funds to your beneficiaries in the event of incapacity or demise. ",
  },
  {
    bgImage: "/images/commonImg3.png",
    header: "Write a Will",
    text: "Relieve yourself and your beneficiaries of the hassle associated with managing and transferring multiple asset classes by setting up a Trust. ",
  },
];

export const estatePlanningData = [
  {
    bgImage: "/images/commonImg5.png",
    header: "Simple will",
    text: "Write a Will from the comfort of your home in few minutes. Include basic assets such as your cash, shares, and retirement savings.",
    path: "simplewill",
  },
  {
    bgImage: "/images/commonImg6.png",
    header: "Comprehensive Will",
    text: "Do you want to include more assets in your Will such as Real estate, Jewellery, e.t.c then a comprehensive Will is more suitable for you.",
    path: "comprehensivewill",
  },
  {
    bgImage: "/images/commonImg7.png",
    header: "Nominated Fund",
    text: "Nominate a Trustee to transfer your cash or  investments proceeds to your specified beneficiary in case of an eventuality.",
    path: "nominatedfund",
  },
  {
    bgImage: "/images/commonImg8.png",
    header: "Living Trust",
    text: "Transfer your Assets into a Trust, The Trustee will manage it for you & your beneficiaries during and after your lifetime. You will still have oversight over such assets.",
  },
  {
    bgImage: "/images/commonImg9.png",
    header: "Testamentary Trust",
    text: "With this, your written Will instructs that specific assets should be transferred a Trust upon your demise and managed by the Trustee for the benefit of your beneficiaries.",
  },
  {
    bgImage: "/images/commonImg10.png",
    header: "Education Trust",
    text: "Set up an Education Trust fund to cater for your Children's Education and be guaranteed of their future in the event of your incapacitation.",
    path: "educationTrust",
  },
];

export const tableData = [
  {
    asset: "car",
    value: "100,000,000",
    interestRate: "7.5%",
    DateAdded: "20-03-2023",
  },
  {
    asset: "Public Entities",
    value: "400,000",
    interestRate: "7.5%",
    DateAdded: "19-05-2023",
  },
  {
    asset: "Private Equities",
    value: "40,000",
    interestRate: "7.5%",
    DateAdded: "10-07-2022",
  },
  {
    asset: "Fintech Wallets",
    value: "90,000",
    interestRate: "7.5%",
    DateAdded: "10-04-2021",
  },
  {
    asset: "Alternate Assets (Cryptocurrency & NFTs)",
    value: "900,000",
    interestRate: "7.5%",
    DateAdded: "10-04-2000",
  },
];

export const estatePlanBreadcrumbData = [
  {
    label: "My Estate Plans",
    link: "/Dashboard/EstatePlans",
  },
  {
    label: "Beneficiaries",
    link: "Beneficiaries",
  },
  {
    label: "Add Estate Plan",
    link: "AddPlans",
  },
];

export const myEstatePlanData = [
  {
    name: "Benjamin Davis Trust",
    status: "Active",
    DateAdded: "18-05-2023",
  },
  {
    name: "Benjamin Davis Will",
    status: "Cancelled",
    DateAdded: "29-03-2023",
  },
  {
    name: "Benjamin Davis Trust",
    status: "Active",
    DateAdded: "18-05-2023",
  },
  {
    name: "Benjamin Davis Will",
    status: "Cancelled",
    DateAdded: "29-03-2023",
  },
  {
    name: "Benjamin Davis Trust",
    status: "Active",
    DateAdded: "18-05-2023",
  },
];

export const beneficiaries = [
  {
    name: "Benjamin Davis",
    relationship: "Spouse",
    EmailAddress: "johndoe@gmail.com",
    phoneNumber: "09087654322",
  },
  {
    name: "Benjamin Davis",
    relationship: "Child",
    EmailAddress: "johndoejane@gmail.com",
    phoneNumber: "09087654322",
  },
  {
    name: "Benjamin Davis",
    relationship: "Spouse",
    EmailAddress: "derick@gmail.com",
    phoneNumber: "09087654322",
  },
  {
    name: "Benjamin Davis",
    relationship: "Child",
    EmailAddress: "emmanueloke@gmail.com",
    phoneNumber: "09087654322",
  },
];

export const eduFormFields = [
  {
    label: "name",
    name: "settlors_name",
    explainerText: "name of the settlor respo For this trust",
    placeholder: "john doe",
    datatype: "string",
    required: true,
  },
  {
    label: "address",
    name: "settlors_address",
    placeholder: "5 lekki road",
    datatype: "textarea",
    required: true,
  },
  {
    label: "Occupation/Profession",
    name: "settlors_occupation",
    placeholder: "",
    datatype: "select",
    options: ["lawyer", "doctor", "employee", "teacher", "realtor"],
    required: true,
  },
];

export const nominieFormFields = [
  {
    label: "name",
    name: "nominators_name",
    explainerText: "name of the settlor respo For this trust",
    placeholder: "john doe",
    datatype: "string",
    required: true,
  },
  {
    label: "Telephone number",
    name: "nominators_phone",
    placeholder: "09087777712",
    datatype: "phone",
    required: true,
  },
  {
    label: "address",
    name: "nominators_address",
    placeholder: "5 lekki road",
    datatype: "textarea",
    required: true,
  },

  {
    label: "Occupation/Profession",
    name: "nominators_occupation",
    placeholder: "",
    datatype: "select",
    options: ["lawyer", "doctor", "employee", "teacher", "realtor"],
    required: true,
  },
];
