import { Product, Translation } from './types';

export const ADMIN_CREDENTIALS = {
  email: "EyadZidan110099@admin.com",
  password: "adminadmin990011@user.com" // In a real app, hash this comparison on server
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    nameAr: 'منشار جسر أتوماتيك (Bridge Saw)',
    nameEn: 'Automatic Bridge Saw',
    image: 'https://picsum.photos/800/600?random=1',
    power: '20 HP',
    weight: '3500 KG',
    workingArea: '3500 x 3500 mm',
    descriptionAr: 'منشار جسر عالي الدقة مزود بنظام ليزر وتحكم كامل لقص الرخام والجرانيت.',
    descriptionEn: 'High precision bridge saw equipped with laser system and full control for cutting marble and granite.'
  },
  {
    id: 'p2',
    nameAr: 'ماكينة CNC خماسية المحاور',
    nameEn: '5-Axis CNC Machine',
    image: 'https://picsum.photos/800/600?random=2',
    power: '25 HP',
    weight: '4200 KG',
    workingArea: '4000 x 4000 mm',
    descriptionAr: 'تكنولوجيا متطورة للحفر والنحت ثلاثي الأبعاد على الحجر القاسي.',
    descriptionEn: 'Advanced technology for 3D engraving and carving on hard stone.'
  },
  {
    id: 'p3',
    nameAr: 'جلاية أوتوماتيك (Polishing Machine)',
    nameEn: 'Automatic Polishing Machine',
    image: 'https://picsum.photos/800/600?random=3',
    power: '40 HP',
    weight: '5000 KG',
    workingArea: '2000 mm width',
    descriptionAr: 'خط جلي وتلميع أوتوماتيكي لإنتاجية عالية ولمعان فائق.',
    descriptionEn: 'Automatic polishing line for high productivity and superior shine.'
  }
];

export const TEXTS: Translation = {
  home: { ar: 'الرئيسية', en: 'Home' },
  products: { ar: 'المنتجات', en: 'Products' },
  admin: { ar: 'الإدارة', en: 'Admin' },
  login: { ar: 'تسجيل الدخول', en: 'Login' },
  logout: { ar: 'تسجيل الخروج', en: 'Logout' },
  footer: { ar: 'جميع الحقوق محفوظة © شركة زيدان 2024', en: 'All rights reserved © Zaidan Co 2024' },
  welcome: { ar: 'شركة زيدان لصناعة ماكينات الحجر', en: 'Zaidan Stone Cutting Machines' },
  heroSub: { ar: 'دقة هندسية - تكنولوجيا CNC - ابتكار مستمر منذ 2012', en: 'Precision Engineering - CNC Technology - Innovation since 2012' },
  historyTitle: { ar: 'تاريخنا', en: 'Our History' },
  historyText: { ar: 'تأسست الشركة عام 2012 على يد السيد جمال زيدان، لتصبح رائدة في مجال تصنيع الآلات الثقيلة.', en: 'Founded in 2012 by Mr. Jamal Zaidan, becoming a leader in heavy machinery manufacturing.' },
  visionTitle: { ar: 'رؤيتنا', en: 'Our Vision' },
  visionText: { ar: 'دمج تقنيات الواقع الافتراضي (VR) والذكاء الاصطناعي في صناعة الحجر.', en: 'Integrating VR and AI technologies into the stone industry.' },
  spec: { ar: 'المواصفات', en: 'Specifications' },
  power: { ar: 'القدرة', en: 'Power' },
  weight: { ar: 'الوزن', en: 'Weight' },
  area: { ar: 'مساحة العمل', en: 'Working Area' },
  customers: { ar: 'العملاء', en: 'Customers' },
  invoices: { ar: 'الفواتير', en: 'Invoices' },
  accounting: { ar: 'المحاسبة', en: 'Accounting' },
  addCustomer: { ar: 'إضافة عميل', en: 'Add Customer' },
  createInvoice: { ar: 'إنشاء فاتورة', en: 'Create Invoice' },
  addEntry: { ar: 'إضافة قيد', en: 'Add Entry' },
  name: { ar: 'الاسم', en: 'Name' },
  phone: { ar: 'الهاتف', en: 'Phone' },
  balance: { ar: 'الرصيد', en: 'Balance' },
  amount: { ar: 'المبلغ', en: 'Amount' },
  date: { ar: 'التاريخ', en: 'Date' },
  details: { ar: 'التفاصيل', en: 'Details' },
  type: { ar: 'النوع', en: 'Type' },
  income: { ar: 'إيراد', en: 'Income' },
  expense: { ar: 'مصروف', en: 'Expense' },
  password: { ar: 'كلمة المرور', en: 'Password' },
  email: { ar: 'البريد الإلكتروني', en: 'Email' },
  accessDenied: { ar: 'وصول مرفوض', en: 'Access Denied' },
  loginRequired: { ar: 'يجب تسجيل الدخول', en: 'Login Required' },
  totalIncome: { ar: 'مجموع الإيرادات', en: 'Total Income' },
  totalExpense: { ar: 'مجموع المصروفات', en: 'Total Expenses' },
  netProfit: { ar: 'صافي الربح', en: 'Net Profit' },
};