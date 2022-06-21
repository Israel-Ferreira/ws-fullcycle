package kafka

import (
	"encoding/json"
	"log"
	"os"
	"time"

	"github.com/Israel-Ferreira/imersao-fullcycle/simulator/application/route"
	"github.com/Israel-Ferreira/imersao-fullcycle/simulator/infra/kafka"
	kafkainf "github.com/Israel-Ferreira/imersao-fullcycle/simulator/infra/kafka"
	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
)

func ProduceMsg(msg *ckafka.Message) {
	producer := kafkainf.NewKafkaProducer()

	route := route.NewRoute()

	json.Unmarshal(msg.Value, &route)

	route.LoadPositions()

	positions, err := route.ExportJsonPositions()

	if err != nil {
		log.Println("Erro ao preencher o json")
		return
	}

	for _, pos := range positions {
		kafka.Publish(pos, os.Getenv("KAFKA_PRODUCE_TOPIC"), producer)
		time.Sleep(time.Millisecond * 500)
	}
}
