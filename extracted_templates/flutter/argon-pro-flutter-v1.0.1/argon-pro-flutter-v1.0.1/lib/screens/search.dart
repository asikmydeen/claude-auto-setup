import 'package:flutter/material.dart';
import 'package:my_app/constants/Theme.dart';
import 'package:my_app/constants/Images.dart';

// widgets
import 'package:my_app/widgets/navbar.dart';
import 'package:my_app/widgets/card-horizontal.dart';
import 'package:my_app/widgets/card-small.dart';
import 'package:my_app/widgets/table-cell.dart';

//screens
import 'package:my_app/screens/product.dart';
import 'package:my_app/screens/beauty.dart';
import 'package:my_app/screens/fashion.dart';

final Map<String, List<Map>> productCards = {
  "Shoes": [
    {
      "title": "Nike Air Max",
      "image": images["fashion"]["Nike Air Max"],
    },
    {
      "title": 'Blue Adidas',
      "image": images["fashion"]["Blue Adidas"],
    },
    {
      "title": 'Perfect Shoes',
      "image": images["fashion"]["Perfect Shoes"],
    },
    {
      "title": 'Fashion Shoes',
      "image": images["fashion"]["Fashion Shoes"],
    },
    {
      "title": 'Orange Sneakers',
      "image": images["fashion"]["Orange Sneakers"],
    },
  ],
  "Beauty": [
    {
      "title": 'Makeup Kit',
      "image": images["fashion"]["Makeup Kit"],
    },
    {
      "title": 'Lipstick Kit',
      "image": images["fashion"]["Lipstick Kit"],
    },
    {
      "title": 'Premium Brushes',
      "image": images["fashion"]["Premium Brushes"],
    },
    {
      "title": 'Fashion Colors',
      "image": images["fashion"]["Fashion Colors"],
    },
    {
      "title": 'Pink Glitter',
      "image": images["fashion"]["Pink Glitter"],
    },
  ],
  "Fashion": [
    {
      "title": 'Colorful Hearts',
      "image": images["fashion"]["Colorful Hearts"],
    },
    {
      "title": 'Get purple inspiration',
      "image": images["fashion"]["Get purple inspiration"],
    },
    {
      "title": 'Favorite high heels',
      "image": images["fashion"]["Favorite high heels"],
    },
    {
      "title": 'Pastel Hearts Sunglasses',
      "image": images["fashion"]["Pastel Hearts Sunglasses"],
    },
    {
      "title": 'Awesome destination',
      "image": images["fashion"]["Awesome destination"],
    },
  ],
  "Places": [
    {
      "title": 'A literary journal published by the Black Earth.',
      "image": images["fashion"]
          ["A literary journal published by the Black Earth."],
    },
    {
      "title": 'By submitting, you guarantee.',
      "image": images["fashion"]["By submitting, you guarantee."],
    },
    {
      "title": 'All About Lights is located in Boie.',
      "image": images["fashion"]["All About Lights is located in Boie."],
    },
    {
      "title": 'Meet our about play staff: click on any.',
      "image": images["fashion"]["Meet our about play staff: click on any."],
    },
    {
      "title": 'Whether it comes from the Sun.',
      "image": images["fashion"]["Whether it comes from the Sun."],
    },
  ],
};

class Search extends StatefulWidget {
  @override
  _SearchState createState() => _SearchState();
}

class _SearchState extends State<Search> {
  final myController = TextEditingController();

  String searchText = "";
  List results = [];

  void dispose() {
    myController.dispose();
    super.dispose();
  }

  _searchText(String searchTerm) {
    setState(() {
      results.clear();
    });
    if (searchTerm.isNotEmpty)
      productCards.forEach((k, v) => v.map((e) {
            if (e["title"].toLowerCase().contains(searchTerm.toLowerCase())) {
              setState(() {
                results.add(e);
              });
            }
          }).toList());
    print(results);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Navbar(
          backButton: true,
          title: "Search",
          rightOptions: false,
          searchBar: true,
          isOnSearch: true,
          searchOnChanged: (String typedText) {
            setState(() {
              searchText = typedText;
            });
            _searchText(searchText);
          },
          searchAutofocus: true,
          // searchController: myController
        ),
        backgroundColor: ArgonColors.bgColorScreen,
        body: Container(
            padding: EdgeInsets.only(left: 27, right: 27, top: 24),
            child: searchText.isNotEmpty
                ? (results.length != 0
                    ? ListView.builder(
                        itemCount: results.length,
                        itemBuilder: (BuildContext context, int index) =>
                            Padding(
                              padding: const EdgeInsets.only(bottom: 8.0),
                              child: CardHorizontal(
                                  title: results[index]["title"],
                                  img: results[index]["image"],
                                  tap: () {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => Product(
                                            title: results[index]["title"],
                                            urlImg: results[index]["image"],
                                          ),
                                        ));
                                  }),
                            ))
                    : SingleChildScrollView(
                        child: Container(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                  "We didn't find \"$searchText\" in our store.",
                                  style: TextStyle(
                                      fontSize: 18, color: ArgonColors.text)),
                              Padding(
                                padding: const EdgeInsets.only(top: 16.0),
                                child: Text(
                                    "You can see more products from other categories.",
                                    style: TextStyle(
                                        fontSize: 18, color: ArgonColors.text)),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(
                                    top: 8.0, bottom: 8.0),
                                child: TableCellSettings(
                                    title: "Fashion",
                                    onTap: () {
                                      Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder: (context) => Fashion(),
                                          ));
                                    }),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(
                                    top: 8.0, bottom: 8.0),
                                child: TableCellSettings(
                                    title: "Beauty",
                                    onTap: () {
                                      Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder: (context) => Beauty(),
                                          ));
                                    }),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(
                                    top: 16.0, bottom: 16.0),
                                child: Text("Daily Deals",
                                    style: TextStyle(
                                        fontSize: 18, color: ArgonColors.text)),
                              ),
                              Row(
                                children: [
                                  CardSmall(
                                      img: productCards["Places"][2]["image"],
                                      title: productCards["Places"][2]["title"],
                                      tap: () {
                                        Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                              builder: (context) => Product(
                                                title: productCards["Places"][2]
                                                    ["title"],
                                                urlImg: productCards["Places"]
                                                    [2]["image"],
                                              ),
                                            ));
                                      }),
                                  CardSmall(
                                      img: productCards["Places"][1]["image"],
                                      title: productCards["Places"][1]["title"],
                                      tap: () {
                                        Navigator.push(
                                            context,
                                            MaterialPageRoute(
                                              builder: (context) => Product(
                                                title: productCards["Places"][1]
                                                    ["title"],
                                                urlImg: productCards["Places"]
                                                    [1]["image"],
                                              ),
                                            ));
                                      })
                                ],
                              ),
                              CardHorizontal(
                                  img: productCards["Places"][0]["image"],
                                  title: productCards["Places"][0]["title"],
                                  tap: () {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) => Product(
                                            title: productCards["Places"][0]
                                                ["title"],
                                            urlImg: productCards["Places"][0]
                                                ["image"],
                                          ),
                                        ));
                                  })
                            ],
                          ),
                        ),
                      ))
                : Container()));
  }
}
