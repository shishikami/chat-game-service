module.exports = {
  apps : [{
    name: "chat-service",
    script: "./dist/index.js",
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      // COZE_API_TOKEN: 'pat_LTc2sxmJWWYiSpeZVsPCuIXocuccruRxJpGYwJ40wad3iEcNW59vPCrpgB9qMCUp',
      COZE_API_TOKEN: 'pat_02mAD25CDzcjx0hb1hW8T1pgfVIRkrX0DCAfuoOd7f5asEQgwDtaCsjonlWmaHWY'
    }
  }]
}