import findspark
findspark.init('/home/ubuntu/spark-2.4.0-bin-hadoop2.6')
import pyspark
import pyspark.sql.functions as f
from pyspark.sql import SparkSession
path = "/home/ubuntu/meteor-graphs/imports/data/"
data = sys.argv[1]
spark = SparkSession.builder.appName('TopDrugSpark').getOrCreate()
df = spark.read.csv(path + "ctsummary.csv", header=True)
counts = spark.read.csv(path = "df_counts.csv")
