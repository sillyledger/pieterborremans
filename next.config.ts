import type { NextConfig } from "next";

// Redirect map from the old flat WordPress URLs (pieterborremans.com/{slug}/)
// to the new post pages (pieterborremans.com/blog/{slug}). Built by matching
// each WordPress post to its Ryoka OS counterpart by title, since slugs
// don't always match 1:1 between the two.
const postRedirects = [
  { source: "/going-to-experiment-with-ridiculous-apps", destination: "/blog/going-to-experiment-with-ridiculous-apps", permanent: true }, // Going to Experiment With Ridiculous Apps
  { source: "/ep-09-the-reset-kinda", destination: "/blog/ep-09-the-reset-kinda", permanent: true }, // Ep 09 | The Reset (Kinda)
  { source: "/ep-08-too-many-subscriptions", destination: "/blog/ep-08-too-many-subscriptions", permanent: true }, // Ep. 08 | Too Many Subscriptions
  { source: "/ep-07-my-app-broke", destination: "/blog/ep-07-my-app-broke", permanent: true }, // Ep 07 | My App Broke
  { source: "/ep-06-a-milestone-update", destination: "/blog/ep-06-a-milestone-update", permanent: true }, // Ep 06 | A Milestone Update
  { source: "/ep-05-duvel-on-the-shelf", destination: "/blog/ep-05-duvel-on-the-shelf", permanent: true }, // Ep 05 | Duvel on the Shelf
  { source: "/ep-04-five-small-targets", destination: "/blog/ep-04-five-small-targets", permanent: true }, // Ep 04 | Five Small Targets
  { source: "/ep-03-first-run-in-twenty-years", destination: "/blog/ep-03-first-run-in-twenty-years", permanent: true }, // Ep 03 | First Run in Twenty Years
  { source: "/ep-02-bad-sleep-mood-and-ai", destination: "/blog/ep-02-bad-sleep-mood-and-ai", permanent: true }, // Ep 02 | Bad Sleep, Mood, and AI?
  { source: "/ep-01-first-entry", destination: "/blog/ep-01-first-entry", permanent: true }, // Ep 01 | First Entry
  { source: "/the-reset-i-need-content-creation-only", destination: "/blog/the-reset-i-need-content-creation-only", permanent: true }, // The Reset I Need: Content Creation Only
  { source: "/bloodhounds-season-2-was-an-absolute-banger", destination: "/blog/bloodhounds-season-2-was-an-absolute-banger", permanent: true }, // Bloodhounds Season 2 Was an Absolute Banger
  { source: "/is-it-too-late-to-start-on-youtube", destination: "/blog/is-it-too-late-to-start-on-youtube", permanent: true }, // Is It Too Late to Start on YouTube? (I Asked Myself the Same Question)
  { source: "/google-workspace-is-out-icloud-mail-and-spacemail-are-in", destination: "/blog/google-workspace-is-out-icloud-mail-and-spacemail-are-in", permanent: true }, // Google Workspace Is Out. iCloud Mail and Spacemail Are In
  { source: "/progress-update-1-whats-been-going-on-so-far", destination: "/blog/progress-update-1-whats-been-going-on-so-far", permanent: true }, // Progress Update #1: What’s Been Going On So Far
  { source: "/my-ipad-pro-went-back-to-being-a-secondary-device", destination: "/blog/my-ipad-pro-went-back-to-being-a-secondary-device", permanent: true }, // My iPad Pro Went Back to Being a Secondary Device
  { source: "/ep-10-taking-a-break-to-fix-the-sound", destination: "/blog/ep-10-taking-a-break-to-fix-the-sound", permanent: true }, // Ep 10 | Taking a Break to Fix the Sound
  { source: "/claude-ai-greatest-tool-biggest-frustration", destination: "/blog/claude-is-the-smartest-dumbest-ai-agent-llm-tool", permanent: true }, // Claude AI Is Both My Greatest Tool and My Biggest Frustration
  { source: "/built-a-directory-four-years-late", destination: "/blog/i-built-a-directory-4-years-too-late-probably", permanent: true }, // I built a directory, probably four years too late
  { source: "/i-spent-an-hour-talking-to-googles-ai-about-seo", destination: "/blog/i-talked-to-google-s-built-in-search-assistant-for-an-hour-about-seo", permanent: true }, // I spent an hour talking to Google's AI about SEO
  { source: "/i-built-a-doc-writing-app-thats-tailored-to-my-vision-now-in-beta", destination: "/blog/i-built-a-doc-writing-app-thats-tailored-to-my-vision-now-in-beta", permanent: true }, // I built a doc writing app that’s tailored to my vision. (now in BETA)
  { source: "/i-did-more-in-30-days-with-claude-than-i-did-in-a-year", destination: "/blog/i-did-more-in-30-days-with-claude-than-i-did-in-a-year", permanent: true }, // I did more in 30 days with Claude than I did in a year.
  { source: "/progress-update-2-a-mess-became-clarity", destination: "/blog/progress-update-2-a-mess-became-clarity", permanent: true }, // Progress Update #2: A Mess Became Clarity
  { source: "/i-built-an-os-dashboard-for-my-workflow", destination: "/blog/i-built-an-os-dashboard-for-my-workflow", permanent: true }, // I Built an Entire OS Dashboard for My Needs
  { source: "/is-traditional-consulting-a-dying-industry", destination: "/blog/is-traditional-consulting-a-dying-industry", permanent: true }, // Is Traditional Consulting a Dying Industry?
  { source: "/builder-rabbit-hole-claude-ai", destination: "/blog/builder-rabbit-hole-claude-ai", permanent: true }, // Did I Fall Into a Builder's Rabbit Hole With Claude AI?
  { source: "/rebranding-story-brew-study-brew", destination: "/blog/rebranding-story-brew-study-brew", permanent: true }, // Rebranding Story Brew for Further Scalability
  { source: "/expat-or-never-went-home", destination: "/blog/expat-or-never-went-home", permanent: true }, // I Don't Know If I'm an Expat, or Just Someone Who Never Went Home
  { source: "/niche-blog-network-publishing-plan", destination: "/blog/niche-blog-network-publishing-plan", permanent: true }, // I’m Building a Niche Blog Network (And Why Blogging Isn’t Dead)
  { source: "/workflow-changed-new-routine", destination: "/blog/workflow-changed-new-routine", permanent: true }, // The Workflow Changed. The Routine Had to Follow.
  { source: "/ditched-wordpress-after-20-years", destination: "/blog/ditched-wordpress-after-20-years", permanent: true }, // After 20 years, I finally ditched WordPress (except for this blog)
  { source: "/high-low-the-new-world-cant-wait", destination: "/blog/high-low-the-new-world-cant-wait", permanent: true }, // HIGH&amp;LOW: The New World - I Can't Wait For This
  { source: "/built-kiroka-free-subscription-tracker", destination: "/blog/built-kiroka-free-subscription-tracker", permanent: true }, // I Built a Free Subscription Tracker
  { source: "/launching-echo-room-long-form-podcast", destination: "/blog/launching-echo-room-long-form-podcast", permanent: true }, // Echo Room: I'm Launching a Long-Form Podcast
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async redirects() {
    return postRedirects;
  },
};

export default nextConfig;
