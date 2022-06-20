package main

import (
	"log"

	"github.com/Israel-Ferreira/imersao-fullcycle/simulator/application/kafka"
	kafkainf "github.com/Israel-Ferreira/imersao-fullcycle/simulator/infra/kafka"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println("error on loading .env file")
	}
}

func main() {

	msgChan := make(chan *ckafka.Message)

	consumer := kafkainf.NewKafkaConsumer(msgChan)

	go consumer.Consume()

	for msg := range msgChan {
		kafka.ProduceMsg(msg)
	}
}
