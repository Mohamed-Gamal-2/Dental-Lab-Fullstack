let linksOverview: any;
if (localStorage.getItem('token')) {
  linksOverview = [
    {
      to: '',
      text: 'dashboard',
      icone: 'fa fa-home',
    },

    {
      to: 'jobs',
      text: 'jobs',
      icone: 'fa fa-clipboard-list',
    },
    {
      to: 'staff',
      text: 'staff',
      icone: 'fa fa-users',
    },
    {
      to: 'dentist',
      text: 'Clients',
      icone: 'fa fa-user-doctor',
    },
  ];
} else {
  linksOverview = [
    {
      to: 'login',
      text: 'login',
      icone: 'fa fa-home',
    },
  ];
}

export { linksOverview };
