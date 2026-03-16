import 'package:flutter/material.dart';
import 'package:my_app/constants/Theme.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

//widgets
import 'package:my_app/widgets/navbar.dart';

final List<Map<String, String>> personalNotificationsList = [
  {
    "text":
        "About your order #45C23B Wifey made the best Father's Day meal ever. So thankful so happy.",
    "time": "15:30",
    "color": "primary"
  },
  {
    "text":
        "Customize our products. Now you can make the best and perfect clothes just for you.",
    "time": "12:10",
    "color": "info"
  },
  {
    "text":
        "Breaking News! We have new methods to payment. Learn how to pay off debt fast using the stack method.",
    "time": "11:23",
    "color": "error"
  },
  {
    "text":
        "Congratulations! Someone just ordered a pair of Yamaha HS8 speakers through your app! Hurry up and ship them!",
    "time": "04:23",
    "color": "success"
  }
];

final Map<String, List<Map<String, String>>> systemNotificationsList = {
  "Unread notifications": [
    {
      "description": "The new message from the author.",
      "title": "New message",
      "time": "2 hrs ago"
    },
    {
      "description": "A confirmed request by one party.",
      "title": "New order",
      "time": "3 hrs ago"
    }
  ],
  "Read notifications": [
    {
      "description": "Let's meet at Starbucks at 11:30. Wdyt?",
      "title": "Last message",
      "time": "1 day ago"
    },
    {
      "description": "A new issue has been reported for Argon.",
      "title": "Product issue",
      "time": "2 days go"
    },
    {
      "description": "Your posts have been liked a lot.",
      "title": "New likes",
      "time": "4 days ago"
    }
  ]
};

class Notifications extends StatefulWidget {
  @override
  _NotificationsState createState() => _NotificationsState();
}

class _NotificationsState extends State<Notifications> {
  int _selectedIndex = 0;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  static List<Widget> _widgetOptions = <Widget>[
    Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: PersonalNotifications(),
    ),
    Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: SystemNotifications(),
    )
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Navbar(
          title: "Notifications",
          backButton: true,
          rightOptions: false,
        ),
        backgroundColor: ArgonColors.bgColorScreen,
        bottomNavigationBar: BottomNavigationBar(
            items: [
              BottomNavigationBarItem(
                  icon: Icon(Icons.person), title: Text("Personal")),
              BottomNavigationBarItem(
                  icon: Icon(FontAwesomeIcons.database, size: 16),
                  title: Text("System"))
            ],
            currentIndex: _selectedIndex,
            selectedItemColor: ArgonColors.primary,
            onTap: _onItemTapped),
        body: Container(
            child: Padding(
          padding: const EdgeInsets.only(left: 24.0, right: 24.0),
          child: _widgetOptions.elementAt(_selectedIndex),
        )));
  }
}

class PersonalNotifications extends StatelessWidget {
  _personalCardBgColor(int index) {
    switch (personalNotificationsList[index]['color']) {
      case 'primary':
        {
          return ArgonColors.primary;
        }
        break;
      case 'info':
        {
          return ArgonColors.info;
        }
        break;
      case 'error':
        {
          return ArgonColors.error;
        }
        break;
      case 'success':
        {
          return ArgonColors.success;
        }
        break;
      default:
        {
          return ArgonColors.primary;
        }
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        child: ListView.builder(
            itemCount: personalNotificationsList.length,
            itemBuilder: (BuildContext context, int index) {
              return Card(
                  margin: EdgeInsets.only(top: 16.0, bottom: 0.0),
                  elevation: 1,
                  child: Padding(
                    padding: const EdgeInsets.only(
                        left: 10.0, right: 10.0, top: 36, bottom: 36),
                    child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            decoration: BoxDecoration(
                                color: ArgonColors.muted.withOpacity(.15),
                                shape: BoxShape.circle,
                                boxShadow: [
                                  BoxShadow(
                                    blurRadius: 15,
                                    spreadRadius: 5,
                                    color: ArgonColors.muted.withOpacity(.25),
                                  )
                                ]),
                            child: CircleAvatar(
                                radius: 24,
                                backgroundColor: _personalCardBgColor(index),
                                child: Icon(Icons.local_shipping,
                                    color: ArgonColors.white, size: 24.0)),
                          ),
                          Flexible(
                              child: Padding(
                            padding:
                                const EdgeInsets.only(left: 16.0, right: 16.0),
                            child: Text(
                                personalNotificationsList[index]['text'],
                                style: TextStyle(color: ArgonColors.text)),
                          )),
                          Row(
                            children: [
                              Icon(Icons.timelapse,
                                  size: 14.0, color: ArgonColors.muted),
                              SizedBox(
                                width: 3,
                              ),
                              Text(personalNotificationsList[index]["time"],
                                  style: TextStyle(color: ArgonColors.muted)),
                            ],
                          )
                        ]),
                  ));
            }));
  }
}

class SystemNotifications extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
        child: SingleChildScrollView(
      child: Column(
        children: [
          Container(
            color: ArgonColors.white,
            margin: EdgeInsets.only(top: 32.0),
            // height: 400,
            child: Column(
              children: [
                Align(
                    alignment: Alignment.centerLeft,
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Text('Unread notifications',
                          style: TextStyle(
                              fontSize: 18.0,
                              color: ArgonColors.text,
                              fontWeight: FontWeight.w600)),
                    )),
                Divider(
                  thickness: 1,
                ),
                Container(
                  height: MediaQuery.of(context).size.height / 5,
                  width: MediaQuery.of(context).size.width,
                  child: ListView.builder(
                      itemCount: systemNotificationsList['Unread notifications']
                          .length,
                      itemBuilder: (BuildContext context, int index) {
                        return Padding(
                          padding: const EdgeInsets.only(
                              top: 16.0, left: 8, right: 8, bottom: 24.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(right: 8.0),
                                child: CircleAvatar(
                                  radius: 15,
                                  backgroundColor: ArgonColors.success,
                                  child: Icon(Icons.chat_bubble,
                                      size: 16, color: ArgonColors.white),
                                ),
                              ),
                              Flexible(
                                flex: 5,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Flexible(
                                          flex: 2,
                                          child: Text(
                                              systemNotificationsList[
                                                      'Unread notifications']
                                                  [index]["title"],
                                              style: TextStyle(
                                                  color: ArgonColors.muted,
                                                  fontWeight: FontWeight.w400)),
                                        ),
                                        Row(
                                          children: [
                                            Icon(Icons.timelapse,
                                                size: 14.0,
                                                color: ArgonColors.muted),
                                            SizedBox(
                                              width: 3,
                                            ),
                                            Text(
                                                systemNotificationsList[
                                                        'Unread notifications']
                                                    [index]["time"],
                                                style: TextStyle(
                                                    color: ArgonColors.muted)),
                                          ],
                                        )
                                      ],
                                    ),
                                    Text(
                                        systemNotificationsList[
                                                'Unread notifications'][index]
                                            ["description"],
                                        style: TextStyle(
                                            color: ArgonColors.text,
                                            fontWeight: FontWeight.w600))
                                  ],
                                ),
                              )
                            ],
                          ),
                        );
                      }),
                )
              ],
            ),
          ),
          Container(
            color: ArgonColors.white,
            margin: EdgeInsets.only(top: 32.0),
            // height: 400,
            child: Column(
              children: [
                Align(
                    alignment: Alignment.centerLeft,
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Text('Read notifications',
                          style: TextStyle(
                              fontSize: 18.0,
                              color: ArgonColors.text,
                              fontWeight: FontWeight.w600)),
                    )),
                Divider(
                  thickness: 1,
                ),
                Container(
                  height: MediaQuery.of(context).size.height / 4,
                  width: MediaQuery.of(context).size.width,
                  child: ListView.builder(
                      itemCount:
                          systemNotificationsList['Read notifications'].length,
                      itemBuilder: (BuildContext context, int index) {
                        return Padding(
                          padding: const EdgeInsets.only(
                              top: 16.0, left: 8, right: 8, bottom: 24),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(right: 8.0),
                                child: CircleAvatar(
                                  radius: 15,
                                  backgroundColor: ArgonColors.error,
                                  child: Icon(Icons.chat_bubble,
                                      size: 16, color: ArgonColors.white),
                                ),
                              ),
                              Flexible(
                                flex: 5,
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Flexible(
                                          flex: 2,
                                          child: Text(
                                              systemNotificationsList[
                                                      'Read notifications']
                                                  [index]["title"],
                                              style: TextStyle(
                                                  color: ArgonColors.muted,
                                                  fontWeight: FontWeight.w400)),
                                        ),
                                        Row(
                                          children: [
                                            Icon(Icons.timelapse,
                                                size: 14.0,
                                                color: ArgonColors.muted),
                                            SizedBox(
                                              width: 3,
                                            ),
                                            Text(
                                                systemNotificationsList[
                                                        'Read notifications']
                                                    [index]["time"],
                                                style: TextStyle(
                                                    color: ArgonColors.muted)),
                                          ],
                                        )
                                      ],
                                    ),
                                    Text(
                                        systemNotificationsList[
                                                'Read notifications'][index]
                                            ["description"],
                                        style: TextStyle(
                                            color: ArgonColors.text,
                                            fontWeight: FontWeight.w600))
                                  ],
                                ),
                              )
                            ],
                          ),
                        );
                      }),
                )
              ],
            ),
          )
        ],
      ),
    ));
  }
}
