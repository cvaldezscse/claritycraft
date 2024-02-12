Overall: Here how to implement the AWS Device Farm into a Java project

#### Documentation:
* Base Documentation: https://docs.aws.amazon.com/devicefarm/latest/developerguide/welcome.html
* Test application exercise: https://docs.aws.amazon.com/devicefarm/latest/developerguide/test-types-built-in-fuzz.html
* Web UI and Mobile testing: https://aws.amazon.com/products/frontend-web-mobile/
* **Device Farm API Documentation**: https://docs.aws.amazon.com/es_es/devicefarm/latest/APIReference/API_Operations.html
* Device Farm and Appium: https://docs.aws.amazon.com/es_es/devicefarm/latest/developerguide/test-types-appium.html
* Device Farm CLI: https://docs.aws.amazon.com/es_es/devicefarm/latest/developerguide/amazon-linux-2-devicefarm-cli.html
* Device Farm with Code Pipeline: https://docs.aws.amazon.com/es_es/devicefarm/latest/developerguide/codepipeline.html
* Device Farm Automation: https://docs.aws.amazon.com/es_es/devicefarm/latest/developerguide/api-ref.html
* Automation troubleshooting: https://docs.aws.amazon.com/es_es/devicefarm/latest/developerguide/troubleshooting.html
* DF Limits: https://docs.aws.amazon.com/es_es/devicefarm/latest/developerguide/limits.html
* DF Tools and Plugins: https://docs.aws.amazon.com/es_es/devicefarm/latest/developerguide/aws-device-farm-tools-plugins.html
* 

## Steps
1. Locate an app installation file (.apk/.ipa), for instance: 
	1. [Flickr Android](https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/flickrj-android/flickrj-android-sample-android.apk)
	2. [mixare v0.9.2](https://storage.googleapis.com/google-code-archive-downloads/v2/code.google.com/mixare/mixarev0.9.2.apk)
	3. [Androiminion](https://github.com/mehtank/androminion/releases)
2. In the AWS UI Console, search `device farm` in the search bar like the image below
	1.![[df_welcome.png]] Click on Next for creating a new project
3. Give a name to the project, in this case `helloDeviceFarm` and add a set of tags as good practice like `CARLOS_VALDEZ` and `TESTING_DEMO` and click on create
	![[df_projectnaming.png]]
		 having a screen like this:
		 ![[df_just_created.png]]
4. Create a new run, clicking on the "Create new Run button" and it will show something like this:
		![[df_newrunsimple.png]]
5. Select and upload the application installation file (Examples provided in step 1) and wait untill the upload is completed, then it will show the app info, then click on next
	![[df_uploaded_app_info.png]]
6. Make sure the following configure section with the values below, then click on next

| Attribute | Value |
| ---- | ---- |
| Test | Built-in Fuzz |
| Event Count | 6000 |
| Event Throttle | 50 |
![[df_configure01.png]]

7. Here comes the select devices page, it is important to highlight that it uses the `Top Devices` device pool by default, then click on next
![[tf_select_devices.png]]
8. For this example, skip the specify device state (there you can do the stuff below)
	- Provide additional data for Device Farm to use during the run, next to Add extra data, choose Upload, and then browse to and choose the .zip file
	- Specify whether Wi-Fi, Bluetooth, GPS, or NFC will be enabled during the run, next to Set radio states, select the appropriate boxes
	- Preset the device latitude and longitude for the run, next to Device location, type the coordinates
	- Reset the device locale for the run, choose the locale in Device Locale
		![[df_specify_devicestate.png]]
9. The following screen will contain the Review and start run menu, we will go all the way down after checking the parameters and click on `Confirm and start run`

![[df_review_and_start_run.png]]

Considerations 1:
* Device farm must start the execution as long as the requested devices are provisioned and available (it is about a couple of minutes)
* Device farm will show a calendar/watch icon until the execution starts. During that time, the results are going to be showed as long as the tests run
![[df_execution_in_progress.png]]


Considerations 2:
* Whenever the execution is complete the icon would change for a completed one (depending on the app complexity the whole execution could take from less than a minute up to more than 10 minutes)

Results:
A summary page is shown and includes the following info:
* A list of devices and test results for each one
* Suites total number, per result
* test list with warnings or unique errors
* screenshots gotten during the execution, grouped by device

![[df_run_details_01.png]]
![[df_job_details.png]]
![[df_job_results_screenshots.png]]