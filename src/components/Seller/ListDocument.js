import React from "react"
import * as styles from "../../pages/seller/sellerProp.module.css"
import "react-multi-carousel/lib/styles.css"
import "bootstrap/dist/css/bootstrap.css"
import { Icon } from "@iconify/react"
import { FiEdit, FiCheck, FiX } from "react-icons/fi"
import { RiCloseLine, RiCheckLine } from "react-icons/ri"
function ListDocument() {
  const documents = [
    {
      name: "Document one",
    },
    {
      name: "Document two",
    },
    {
      name: "Document three",
    },
    {
      name: "Document four",
    },
  ]

  const priceDetails = [
    {
      name: "List Price ",
      dataone: "$164,000",
    },
    {
      name: "Current Offer Price",
      dataone: "$154,000",
      datatwo: <FiEdit size={20} stroke={"#0490fb"} />,
    },
    {
      name: "Seller Current Counter",
      dataone: "PENDING",
      datatwo: (
        <i
          className="fa fa-circle"
          style={{
            color: "#fa6400",
            fontSize: "15px",
            display: "flex",
          }}
        ></i>
      ),
    },
    {
      name: "Deposit",
      dataone: "3%",
    },
    {
      name: "Loan Amount",
      dataone: "$110,000",
    },
    {
      name: "POF",
      dataone: "No",
    },
    {
      name: "As-Is",
      dataone: "Yes",
    },
    {
      name: "Appraisal",
      dataone: "12",
    },
    {
      name: "Signed Disclosures",
      dataone: "No",
      datatwo: <FiEdit size={20} stroke={"#0490fb"} />,
      datathree: "3 buyers have viewed disclosures ",
    },
    {
      name: "Cont. Removal",
      dataone: "No",
    },
  ]

  return (
    <div className={styles.listBack}>
      <p className={styles.activeOffer}>List of Documents</p>
      <table width={440}>
        {documents.map(doc => (
          <tr
            style={{
              marginTop: "20px",
            }}
          >
            <td>
              <p className={styles.docFirst}>{doc.name}</p>
            </td>
            <td>
              <p className={styles.docSecond}>
                <FiCheck stroke="#6cc429" size={30} />
              </p>
            </td>
            <td>
              <p className={styles.docThird}>
                <RiCloseLine fill="#e92222" size={30} fontWeight="bold" />
              </p>
            </td>
          </tr>
        ))}
      </table>

      <table width={440} className={styles.tableDesign}>
        {priceDetails.map(price => (
          <tr
            style={{
              marginTop: "20px",
              justifyContent: "space-around",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <td>
              <p className={styles.docFirst1}>
                {price.name}
                <br />
                <span style={{ fontSize: "12px" }}>{price.datathree}</span>
              </p>
            </td>
            <td>
              <p className={styles.docSecond1}>
                <b>{price.dataone}</b>
              </p>
            </td>
            <td>
              <p className={styles.docThird1}>{price.datatwo}</p>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default ListDocument
