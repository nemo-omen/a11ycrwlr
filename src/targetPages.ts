export const targetPages = [
  {
    name: 'Home',
    url: 'https://ramport.angelo.edu/'
  },
  {
    name: 'Academics',
    url: 'https://ramport.angelo.edu/web/home-community/academics',
    children: [
      {
        name: 'Week at a Glance',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskfshd.P_CrseSchd'
      },
      {
        name: 'Concise Schedule',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskcrse.P_CrseSchdDetl'
      },
      {
        name: 'Detailed Schedule',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskfshd.P_CrseSchdDetl'
      },
      {
        name: 'Find Textbooks',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwwkbook.P_DispBuyBooks'
      },
      {
        name: 'Course Catalog',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskfcls.p_disp_dyn_ctlg'
      },
      {
        name: 'Navigate',
        url: 'https://angelo.campus.eab.com/'
      },
      {
        name: 'Degree Evaluation',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwwkderd.p_degreeEvalRedir'
      },
      {
        name: 'View Unofficial Transcript',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskotrn.P_ViewTermTran'
      },
      {
        name: 'Request Official Transcript',
        url: 'https://www.parchment.com/u/registration/32224/account'
      },
      {
        name: 'Request Enrollment Verification',
        url: 'https://www.angelo.edu/content/forms/35-enrollment-verification-form'
      },
      {
        name: 'Suspension Appeal Application',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwwkappl.p_insert_appeal'
      },
      {
        name: 'View TSI Status',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bzskgstu.P_TxInfo'
      },
    ]
  },
  {
    name: 'Financial Aid and Billing', url: 'https://ramport.angelo.edu/web/home-community/finances',
    children: [
      {
        name: 'View Bill',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwskoacc.P_ViewAcctTerm'
      },
      {
        name: 'Pay Online',
        url: 'https://www.angelo.edu/webpay2'
      },
      {
        name: 'Payment Plans',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwwkistm.p_display_form'
      },
      {
        name: 'Federal Loans',
        url: 'https://www.angelo.edu/services/financial_aid/long_term_loans/'
      },
      {
        name: '1098-T Tax Notification',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwtktxns.p_disp_tax_notification'
      },
      {
        name: 'View/Accept Financial Aid Awards',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwrkrhst.P_DispAwdAidYear'
      },
      {
        name: 'Student Requirements',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwrkelig.P_DisplayTabs'
      },
      {
        name: 'Apply for ASU Scholarships',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=bwgksrvy.P_ShowSurveys'
      },
      {
        name: 'Emergency Tuition and Fees Loan',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=!bwwksela.p_application?loan_type=tloan'
      },
      {
        name: 'Book Loan',
        url: 'https://sso.prod.angelo.edu/ssomanager/c/SSB?pkg=!bwwksela.p_application?loan_type=bloan'
      },
      {
        name: 'iGrad',
        url: 'https://igrad.angelo.edu/'
      },
    ]
  },
  {
    name: 'Campus Life',
    url: 'https://ramport.angelo.edu/web/home-community/campus-life'
  },
  // - Talk over this section with Dr. Garrison. Almost everything here leads either to the front-facing site or an external service. It might be best to restrict testing to the main "Campus Life" page
  {
    name: 'Registration',
    url: 'https://ramport.angelo.edu/web/home-community/registration'
  },
];