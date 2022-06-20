package kafka

import (
	"fmt"
	"log"
	"os"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

func NewKafkaProducer() *ckafka.Producer {

	fmt.Println(os.Getenv("KAFKA_BOOTSTRAP_SERVERS"))
	configMap := &ckafka.ConfigMap{
		"bootstrap.servers": os.Getenv("KAFKA_BOOTSTRAP_SERVERS"),
		// "security.protocol": os.Getenv("SECURITY_PROTOCOL"),
		// "sasl.mechanisms":   os.Getenv("SASL_MECHANISMS"),
		// "sasl.username":     os.Getenv("SASL_USERNAME"),
		// "sasl.password":     os.Getenv("SASL_PASSWORD"),
	}

	p, err := ckafka.NewProducer(configMap)

	if err != nil {
		log.Println("error on kafka producer creation: " + err.Error())
	}

	return p
}

func Publish(msg string, topic string, producer *ckafka.Producer) error {
	message := &ckafka.Message{
		TopicPartition: ckafka.TopicPartition{Topic: &topic, Partition: ckafka.PartitionAny},
		Value:          []byte(msg),
	}

	if err := producer.Produce(message, nil); err != nil {
		return err
	}

	

	return nil
}
