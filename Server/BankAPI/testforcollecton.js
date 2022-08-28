import 
MongoClient mongoClient = new MongoClient("localhost", 27017);
DB db = mongoClient.getDB("kala");
String testCollectionName = "bankaccountdetails";
System.out.println("Collection Name " + testCollectionName + " " + db.collectionExists(testCollectionName));