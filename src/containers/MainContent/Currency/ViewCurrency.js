import React, { Component, useEffect, useState } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import $ from "jquery";
import CurrencyService from "../../../services/CurrencyService";
import { Button } from "reactstrap";


const CurrencyList = () => {
  const [selectedCurrency, setSelectedCurrency] = useState({ name: "" });
  const [data, setDataa] = useState([]);

  useEffect(() => {
    getCurrency();
  }, []);

  const getCurrency = () => {
    CurrencyService.getAllCurrency()
      .then((res) => {
        let dataa = [];
        res.data.map((item, index) => {
          dataa.push({
            id: item._id,
            name: item.name ? item.name : "none",
            exchangeRate: item.exchangeRate ? item.exchangeRate : "none",
          });
        });
        console.log("data", dataa);
        setDataa(dataa);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <AUX>
      <div className="page-content-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card m-b-20">
                <div className="card-body">
                <div className="row align-items-center mb-3">
                    <div className="col">
                    <h3 className="m-0 p-0">All Currencies</h3>
                    </div>
                    <div className="col">
                    <Link to="/addcurrency">
                      <Button
                        color="success"
                        className="my-primary-button float-right"
                      >
                        Add Currency
                      </Button>
                    </Link>
                    </div>
                  </div>

                  <table className="table table-editable" id="mydtable">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Exchange Rate</th>
                      </tr>
                    </thead>
                    {console.log("datin tbl", data)}
                    {data.map((item, index) => {
                      return (
                        <tr>
                          <td data-original-value="22">{item.name}</td>
                          <td>
                            <Editable
                              dataType="text"
                              mode="inline"
                              value={item.exchangeRate}
                              display={(value) => {
                                console.log("value edit", value);
                                console.log("value edit", item);
                                CurrencyService.updateCurrency(item.id, {
                                  exchangeRate: value,
                                });
                                return <strong>{value}</strong>;
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AUX>
  );
};

export default CurrencyList;
