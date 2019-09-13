# TSD

https://tsd-app-prod.azurewebsites.net/ships/RS_163_Kristian_Gerhard_Jebsen_II.json

## Overview

In this application we have attempted to predict if a ship from the Norwegian Coast Guard has to go on a mission a given day based on its current location, weather predictions from that location, and the date. We have based the predictions on tweets made by Redningsselskapet and tried to interperet the tweet to link it to one of the ships in Redningsselskapet's fleet. All the data for the different ships has then been ingested into Veracity, to be shown in this web application. 

## Collecting the data

1. The first thing we had to do was gathering all the necessary information about Redningsselskapet's ships. This was gathered from their own [website](https://www.redningsselskapet.no/om-oss/redningsskoytene/), and parsed using a simple python script.
2. When all the ship data was gathered we used the [Twitter API](https://developer.twitter.com/en/docs.html) to get [Redningsselskapet's](twitter.com/NSSR) twitter feed. We then used a scoring function on each tweet to find out what ship the tweet was about.
3. We also found out the location of each tweet, usin [Azure Text Analytics](https://azure.microsoft.com/nb-no/services/cognitive-services/text-analytics/), although we were not able to extract locations from every tweet.
4. For all the locations obtained, we used Google to get the location coordinates for all the locations.
5. When the locations were also gathered, we used the [Meteomatics](https://www.meteomatics.com/en/api/overview/) weather API to collect historical weather data for each tweet.

When all the data was gathered, tweets about each ship was saved to seperate files together with the ship's metadata and ingested into Veracity.

## Machine Learning Model

The machine learning model is a simple Decision Tree, as the amount of data gathered was too limited to use a more sophisticated prediction model. We were only able to get Redningsselskapet's 3000 latest tweets, and were further constrained by only having historical weather data dating 1 year. Therefore the use of a more advanced model showed to be unnecessary. We were also unable to get AIS-data for the ships, which would have given a bigger amount of data to train the model. Instead of only having approximate weather data for the ship's of which a tweet is about, we could have obtained the weather and location data of every single ship on every day. 


## Disclaimer
This project is only an experimental project to show how you can ingest data into Veracity and then display the data in an application. The google maps component is therefore used with a trial user, as this application is not meant for commercial use.
