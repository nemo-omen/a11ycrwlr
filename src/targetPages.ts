/**
 * These are pages that can be tested without authorization.
 * They're included because they're central to a student's
 * ability to either establish a digital account, access
 * their digital account, or access documentation for the
 * digital tools provided by the university.
 */
export const nonAuthPages = [
  {
    // Initial student account sign up
    title: "MyAccount",
    url: "https://aic.angelo.edu/AIssue/Self/"
  },
  {
    // Changing password
    title: "MyPassword",
    url: "https://mypassword.angelo.edu/Login.aspx?ReturnUrl=%2f"
  },
  {
    // Knowledge base info for recovering password
    title: "Public Knowledge - Using the MyPassword Service",
    url: "https://angelostate.servicenowservices.com/kb?id=kb_article_view&sysparm_article=KB0010286&sys_kb_id=62b1d388dbd08d1047e8818a1396193c&spa=1"
  },
  {
    // General knowledge base
    title: "Knowledge Home - Knowledge Portal",
    url: "https://angelostate.servicenowservices.com/kb?id=kb_home",
  },
  {
    // Parking pass login
    title: "Login - Parking Services-OPS-COM",
    url: "https://angelostate.ops-com.com/login"
  }
];

/**
 * This page is a special case. It will need a report to
 * be generated for each step in the login process. Why?
 * Because each step of the client-side-only form has
 * several errors that should be recorded.
 * Also, authentication and cookie storage should be
 * setup while navigating this page.
 */
export const loginPage = {
  title: 'Home - RamPort',
  url: 'https://test-ramport.angelo.edu/',
};

/**
 * These are all of the pages accessible through RamPort. They
 * require authorization/authentication and cookies.
 */
export const authPages = [
  {
    title: 'Academics - RamPort',
    url: 'https://test-ramport.angelo.edu/web/home-community/academics',
  },
  {
    title: 'Week at a Glance',
    url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskfshd.P_CrseSchd'
  },
  {
    title: 'Concise Schedule',
    url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskcrse.P_CrseSchdDetl'
  },
  {
    title: 'Detailed Schedule',
    url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskfshd.P_CrseSchdDetl'
  },
  {
    title: 'Find Textbooks',
    url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwwkbook.P_DispBuyBooks'
  },
  {
    title: 'Course Catalog',
    url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskfcls.p_disp_dyn_ctlg'
  },
  {
    title: 'Navigate',
    url: 'https://angelo.campus.eab.com/'
  },
  {
    title: 'Degree Evaluation',
    url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwwkderd.p_degreeEvalRedir'
  },
  {
    title: 'View Unofficial Transcript',
    url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskotrn.P_ViewTermTran'
  },
  {
    title: 'Request Official Transcript',
    url: 'https://www.parchment.com/u/registration/32224/account'
  },
  {
    title: 'Request Enrollment Verification',
    url: 'https://www.angelo.edu/content/forms/35-enrollment-verification-form'
  },
  {
    title: 'Suspension Appeal Application',
    url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwwkappl.p_insert_appeal'
  },
  {
    title: 'View TSI Status',
    url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bzskgstu.P_TxInfo'
  },
  {
    title: 'Financial Aid and Billing',
    url: 'https://test-ramport.angelo.edu/web/home-community/finances',
  },
  {
    title: 'View Bill',
    url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskoacc.P_ViewAcctTerm'
  },
  {
    title: 'Pay Online',
    url: 'https://www.angelo.edu/webpay2'
  },
  {
    title: 'Payment Plans',
    url: 'https://sso-stage.test.angelo.edu/ssomanager/c/SSB?pkg=bwwkistm.p_display_form'
  },
  {
    title: 'Federal Loans',
    url: 'https://www.angelo.edu/services/financial_aid/long_term_loans/'
  },
  {
    title: '1098-T Tax Notification',
    url: 'https://sso-stage.test.angelo.edu/ssomanager/c/SSB?pkg=bwtktxns.p_disp_tax_notification'
  },
  {
    title: 'View/Accept Financial Aid Awards',
    url: 'https://sso-stage.test.angelo.edu/ssomanager/c/SSB?pkg=bwrkrhst.P_DispAwdAidYear'
  },
  {
    title: 'Student Requirements',
    url: 'https://sso-stage.test.angelo.edu/ssomanager/c/SSB?pkg=bwrkelig.P_DisplayTabs'
  },
  {
    title: 'Apply for ASU Scholarships',
    url: 'https://sso-stage.test.angelo.edu/ssomanager/c/SSB?pkg=bwgksrvy.P_ShowSurveys'
  },
  {
    title: 'Emergency Tuition and Fees Loan',
    url: 'https://sso-stage.test.angelo.edu/ssomanager/c/SSB?pkg=!bwwksela.p_application?loan_type=tloan'
  },
  {
    title: 'Book Loan',
    url: 'https://sso-stage.test.angelo.edu/ssomanager/c/SSB?pkg=!bwwksela.p_application?loan_type=bloan'
  },
  {
    title: 'iGrad',
    url: 'https://igrad.angelo.edu/'
  },
  {
    title: 'Campus Life',
    url: 'https://test-ramport.angelo.edu/web/home-community/campus-life'
  },
  {
    title: 'Registration',
    url: 'https://test-ramport.angelo.edu/web/home-community/registration'
  },
];