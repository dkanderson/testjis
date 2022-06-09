'use strict';

const jis_nav = React.createElement;
const base_url = document.querySelector('body').dataset.base_url;
console.log(base_url);


class NavButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      data: nav_menu,
      current: 'home'
    }

    this.handleClick = this.handleClick.bind(this);
    this.toggleActiveState = this.toggleActiveState.bind(this);
  }

  handleClick(e){
      this.toggleActiveState();
  }

  toggleActiveState(){
      if(this.state.active){
          this.setState({
              active: false
          });
      } else {
        this.setState({
            active: true
        });
      }
  }

  generateNav(){
      return nav_menu.map((data) => {

        return /*#__PURE__*/ React.createElement("li", {key: data.title}, /*#__PURE__*/React.createElement("a", {
    href: data.link
  }, data.title));
        
      });
  }

  populateNav(){
    return React.createElement("ul", {
        className: "jis-nav-container-inner"
      }, /*#__PURE__*/this.generateNav());
  }

  render() {

    return/*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
      className: this.state.active ? "jis-nav-btn active" : "jis-nav-btn",
      onClick: this.handleClick
    }, /*#__PURE__*/React.createElement("span", {
      className: "bars"
    }), /*#__PURE__*/React.createElement("span", {
      className: "bars"
    }), /*#__PURE__*/React.createElement("span", {
      className: "bars"
    })), /*#__PURE__*/React.createElement("div", {
      className: `jis-nav-container ${this.state.active ? 'open' : 'closed'}`
    }, this.populateNav()));
  }
}

const jn_domContainer = document.querySelector('#jis-nav-btn');
const jn_root = ReactDOM.createRoot(jn_domContainer);
jn_root.render(jis_nav(NavButton));

const jis_nav_base_url = '';


const nav_menu = [
    {
            title: "home",
            link: jis_nav_base_url + 'index.html'
    },

    {
        title: "news",
        link: jis_nav_base_url + "single-story.html"
    },
        
    {
        title: "features",
        link: jis_nav_base_url + "features",
        subnav: [
            {
                title: "innovation",
                link: "https://jis.gov.jm/category/innovation"
            }
        ]
    },

    {
        title: "television",
        link: jis_nav_base_url + "video-page.html"
    },

    {
        title: "radio",
        link: jis_nav_base_url + "radio-page.html"
    },

    {
        title: "information",
        link: jis_nav_base_url + "information.html",
        subnav: [
            {
                title: "about jamaica",
                link: "https://jis.gov.jm/category/innovation",
                subnav: [
                    {
                        title: "history",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "emancipation",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "emancipationStalwarts",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "independence",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "anthem &amp; pledge",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "national heroes",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "national symbols",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "national awards",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "heritage sites",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "heritage in dance &amp; music",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "parish profiles",
                        link: "https://jis.gov.jm/category/innovation"
                    }
                ]
            },
            {
                title: "get the facts",
                link: "https://jis.gov.jm/category/innovation",
                subnav: [
                    {
                        title: "Every Child Must Learn &mdash; Extra Lesson Programme",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Contractor Registration for GOJ Projects",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Safety First! How to Safeguard our Children",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "A Head Start in Life",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Curbing Youth Violence with Conflict Resolution",
                        link: "https://jis.gov.jm/category/innovation"
                    }
                ]
            },
            {
                title: "tips",
                link: "https://jis.gov.jm/category/innovation",
                subnav: [
                    {
                        title: "Do&#8217;s and Don&#8217;ts in Communicating with the Deaf and Hard of Hearing",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Back to School Health Tips: Properly Wash Your Hands",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Flood Safety Tips",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Landslide Safety Tips",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Earthquake Safety Tips",
                        link: "https://jis.gov.jm/category/innovation"
                    }
                ]
            },
            {
                title: "faqs",
                link: "https://jis.gov.jm/category/innovation",
                subnav: [
                    {
                        title: "How Do I protect Myself From Cybercrimes?",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "What Are The Damages That A Hurricane Can Cause?",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "What Are The Hurricane Categories?",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Returning Residents | Your Safety and Security Guide to Resettling in Jamaica",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Returning Residents | Returning Citizens&#8217; Information Guide",
                        link: "https://jis.gov.jm/category/innovation"
                    }
                ]
            },
            {
                title: "more",
                link: "https://jis.gov.jm/category/innovation",
                subnav: [
                    {
                        title: "Jamaica Day 2022",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Ananda Alerts",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Calendar",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Hurricanes in Jamaica",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Heritage Competition",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Famous Jamaicans",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "National Honours and Awards Recipients",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Nationality and Citizenship",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Returning Residents",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Jamaicans Overseas &amp; Consular Affairs Department",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Eligibility and Basic Provisions for Returning Resident Status",
                        link: "https://jis.gov.jm/category/innovation"
                    },
                    {
                        title: "Edward Seaga Tribute",
                        link: "https://jis.gov.jm/category/innovation"
                    }
                ]
            }
        ]
    },

    {
        title: "government",
        link: jis_nav_base_url + "government.html",
        subnav: [
            {
                title: "branches",
                link: "#",
                subnav: [
                    {
                        title: 'the monarch',
                        link: '#'
                    },
                    {
                        title: 'the executive',
                        link: '#'
                    },
                    {
                        title: 'the legislature',
                        link: '#'
                    },
                    {
                        title: 'judiciary',
                        link: '#'
                    },
                    {
                        title: 'the opposition',
                        link: '#'
                    }
                ]
            },
            {
                title: "profiles",
                link: "#",
                subnav: [
                    {
                        title: 'governor general',
                        link: '#'
                    },
                    {
                        title: 'prime minister',
                        link: '#'
                    },
                    {
                        title: 'opposition leader',
                        link: '#'
                    },
                    {
                        title: 'ministers',
                        link: '#'
                    },
                    {
                        title: 'members of parlaiment',
                        link: '#'
                    },
                    {
                        title: 'senators',
                        link: '#'
                    },
                    {
                        title: 'cabinet',
                        link: '#'
                    }
                ]
            },
            {
                title: "speeches",
                link: "#",
                subnav: [
                    {
                        title: 'governor general',
                        link: '#'
                    },
                    {
                        title: 'prime minister',
                        link: '#'
                    },
                    {
                        title: 'opposition leader',
                        link: '#'
                    },
                    {
                        title: 'budget &amp; sectorial debates',
                        link: '#'
                    },
                    {
                        title: 'all speeches',
                        link: '#'
                    }
                ]
            },
            {
                title: "documents",
                link: "#",
                subnav: [
                    {
                        title: 'The Constitution',
                        link: '#'
                    },
                    {
                        title: 'Laws of Jamaica',
                        link: '#'
                    },
                    {
                        title: 'Tax Reform',
                        link: '#'
                    },
                    {
                        title: 'Communication Policy',
                        link: '#'
                    },
                    {
                        title: 'All Documents',
                        link: '#'
                    }
                ]
            },
            {
                title: "more",
                link: "#",
                subnav: [
                    {
                        title: 'GOJ Portal - GOV.JM',
                        link: '#' 
                    },
                    {
                        title: 'Ministries',
                        link: '#' 
                    },
                    {
                        title: 'Agencies',
                        link: '#' 
                    },
                    {
                        title: 'Contractor General',
                        link: '#' 
                    },
                    {
                        title: 'Checks &#038; Balances',
                        link: '#' 
                    },
                    {
                        title: 'Protocol',
                        link: '#' 
                    },
                    {
                        title: 'Table of Precedence',
                        link: '#' 
                    },
                    {
                        title: 'Budget',
                        link: '#' 
                    },
                    {
                        title: 'GOJ Procurements',
                        link: '#' 
                    },
                    {
                        title: 'JIS Bulletin Page',
                        link: '#' 
                    },
                    {
                        title: 'Official Visits',
                        link: '#' 
                    },
                    {
                        title: 'GOJ Websites',
                        link: '#' 
                    } 
                ]
            }
        ]
    },

    {
        title: "corporate",
        link: jis_nav_base_url + "corporate.html",
        subnav: [
            {
                title: "Departments",
                link: "#",
                subnav: [
                    {
                        title: "Editorial",
                        link: "#"
                    },
                    {
                        title: "Radio",
                        link: "#"
                    },
                    {
                        title: "Television",
                        link: "#"
                    },
                    {
                        title: "Photo Unit",
                        link: "#"
                    },
                    {
                        title: "Research and Publications",
                        link: "#"
                    },
                    {
                        title: "Public Relations and Marketing",
                        link: "#"
                    },
                    {
                        title: "Computer Services",
                        link: "#"
                    }
                ]
            },
            {
                title: "Leadership",
                link: "#",
                subnav: [
                    {
                        title: "Advisory Board",
                        link: "#"
                    },
                    {
                        title: "Management",
                        link: "#"
                    }
                ]
            },
            {
                title: "Careers &amp; Tenders",
                link: "#",
                subnav: [
                    {
                        title: "Career Opportunities",
                        link: "#"
                    },
                    {
                        title: "Tenders",
                        link: "#"
                    }
                ]
            }
        ]
    },

    {
        title: "contact us",
        link: jis_nav_base_url + "contact.html"
    }
]