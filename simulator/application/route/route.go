package route

import (
	"bufio"
	"encoding/json"
	"errors"
	"os"
	"strconv"
	"strings"
)

type Route struct {
	ID        string     `json:"routeId"`
	ClientID  string     `json:"clientId"`
	Positions []Position `json:"position"`
}

func NewRoute() *Route {
	return &Route{}
}

type Position struct {
	Long float64 `json:"long"`
	Lat  float64 `json:"lat"`
}

type PartialRoutePosition struct {
	ID       string    `json:"routeId"`
	ClientID string    `json:"clientId"`
	Position []float64 `json:"position"`
	Finished bool      `json:"finished"`
}

func (r *Route) LoadPositions() error {

	if r.ID == "" {
		return errors.New("route id not informed")
	}

	f, err := os.Open("destinations/" + r.ID + ".txt")

	if err != nil {
		return err
	}

	defer f.Close()

	scanner := bufio.NewScanner(f)

	for scanner.Scan() {
		data := strings.Split(scanner.Text(), ",")

		lat, err := strconv.ParseFloat(data[0], 64)

		if err != nil {
			return err
		}

		long, err := strconv.ParseFloat(data[1], 64)

		if err != nil {
			return err
		}

		position := Position{Lat: lat, Long: long}

		r.Positions = append(r.Positions, position)
	}

	return nil
}

func (r *Route) ExportJsonPositions() ([]string, error) {
	var route PartialRoutePosition

	var result []string

	total := len(r.Positions)

	for k, v := range r.Positions {
		route.ID = r.ID
		route.ClientID = r.ClientID

		route.Position = []float64{v.Lat, v.Long}
		// route.Finished = false

		if k == total-1 {
			route.Finished = true
		}

		jsonResult, err := json.Marshal(&route)

		if err != nil {
			return nil, err
		}

		result = append(result, string(jsonResult))
	}

	return result, nil
}
