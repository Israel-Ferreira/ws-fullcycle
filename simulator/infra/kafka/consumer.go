package kafka

import (
	"fmt"
	"log"
	"os"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

type KafkaConsumer struct {
	MsgChan chan *ckafka.Message
}

func NewKafkaConsumer(msgChan chan *ckafka.Message) *KafkaConsumer {
	return &KafkaConsumer{
		MsgChan: msgChan,
	}
}

func (k *KafkaConsumer) Consume() {
	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": os.Getenv("KAFKA_BOOTSTRAP_SERVERS"),
		"group.id":          os.Getenv("KAFKA_CONSUMER_GROUP_ID"),
	}

	c, err := ckafka.NewConsumer(configMap)

	if err != nil {
		log.Fatalln("error consuming kafka message: " + err.Error())
	}

	defer c.Close()

	topics := []string{os.Getenv("KAFKA_READ_TOPIC")}

	if err = c.SubscribeTopics(topics, nil); err != nil {
		log.Fatalln("")
	}

	fmt.Println("Kafka Consumer has been started")

	for {
		msg, err := c.ReadMessage(-1)

		if err == nil {
			k.MsgChan <- msg
		}
	}

}
