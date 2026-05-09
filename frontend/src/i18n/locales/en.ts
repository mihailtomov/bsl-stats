const en = {
  translation: {
    page: {
      tournaments: {
        error: {
          listUnavailable:
            'There are no tournaments to display. Something went wrong with obtaining the list from the server.'
        }
      },
      tournamentStats: {
        error: {
          invalidTournamentNumber:
            "Tournament number doesn't exist yet. Try a different one from the links above.",
          emptyMatchData: 'No match data available.'
        }
      },
      playerStats: {
        error: {
          playerDidNotParticipate: `Player with nickname <bold>{{ player }}</bold> did not participate in BSL
          {{ tournamentNumber }}. Click on a tournament number above to view the
          list with participating players.`
        }
      },
      about: {
        introduction: `I've developed this app out of love for the foreign BW community
        and the game itself. I know all of this data is already available on
        Liquipedia, but i found combining these stats in a simpler UI makes it
        easier to gain an overview of players performance.`,
        links: {
          zzzero: `Big respect to <zzzero /> and the
        people he has been working with throughout the years to create so much
        content and keep the foreign BW competitive scene alive!`,
          patreon: `Please feel
        free to support them in any way you can by following the streaming
        channels or consider <patreon />`,
          liquipedia: `It's very important to give credit to Liquipedia's development
        team for exposing and maintaining a free public API from where this data
        can be accessed from. Special thanks to Nydra for providing me with the
        API key, top man! For Brood War there are two API's available and
        the one i'm using for this project is <liquipediadb />`,
          dataAttribution: `This data is under a CC BY-SA 3.0 license. For more information see: <license />.`,
          iconsAttribution: `App icons attribution below:<br /> <icons />`
        }
      },
      privacySection: {
        clarity: {
          introduction: {
            tool: `I use a tool called Microsoft Clarity to better understand how people
        use this website. By default it is disabled until user consent is
        provided. When enabled, Clarity shows me things like:`,
            pagesVisited: 'Which pages are the most visited',
            visitorClicks: 'What visitors click on',
            pageScrolls: 'How far down the page someone scrolls',
            siteIssues:
              "If anything on the site seems confusing or isn't working properly"
          },
          functionality: {
            recording: `To do this, Clarity may record how you interact with the site, kind of
        like a video of your visit, and collects basic info about your device
        and browser.`,
            statement: 'Just so you know:',
            userFriendly:
              'This helps me improve the website and make it more user-friendly.',
            personalDetails:
              "Clarity doesn't collect personal details like your name or email.",
            microsoftServices:
              'Microsoft may also use some of this data to improve their own services.'
          },
          cookies: `Clarity uses cookies to remember if you&apos;ve been here before. These
        cookies are set by Microsoft and might also track your activity on other
        websites that use Clarity. For more information about how Microsoft
        collects and uses your data, visit the <microsoftprivacystatement>. I also use a functional cookie to remember your choice. This cookie
        stores your answer so I don&apos;t bother you with my cookie banner on
        every visit.`,
          consent: {
            statement: `You are in complete control whether I or Microsoft can collect this data
        or not. In order to do this simply move the toggle switch below to
        allow/disallow tracking:`,
            toggle: 'Tracking is {{trackingStatus}}'
          }
        }
      }
    },
    error: {
      general: 'Something went wrong!',
      pageNotFound:
        'Looks like there is nothing here. Try one of the links from the menu above.'
    }
  }
} as const;

export default en;
