import React from "react";
import axios from "axios";

export default function DHL() {
  const username = "demoKey";
  const password = "123456";
  const token = btoa(`${username}:${password}`);

  const options = {
    method: "POST",
    url: "https://api-mock.dhl.com/mydhlapi/shipments",
    headers: {
      "content-type": "application/json",
      "Message-Reference": "SOME_STRING_VALUE",
      "Message-Reference-Date": "SOME_STRING_VALUE",
      "Plugin-Name": "SOME_STRING_VALUE",
      "Plugin-Version": "SOME_STRING_VALUE",
      "Shipping-System-Platform-Name": "SOME_STRING_VALUE",
      "Shipping-System-Platform-Version": "SOME_STRING_VALUE",
      "Webstore-Platform-Name": "SOME_STRING_VALUE",
      "Webstore-Platform-Version": "SOME_STRING_VALUE",
      Authorization: `Basic ${token}`,
    },
    data: {
      plannedShippingDateAndTime: "2019-08-04T14:00:31GMT+01:00",
      pickup: {
        isRequested: false,
        closeTime: "18:00",
        location: "reception",
        specialInstructions: [
          { value: "please ring door bell", typeCode: "TBD" },
        ],
        pickupDetails: {
          postalAddress: {
            postalCode: "14800",
            cityName: "Prague",
            countryCode: "CZ",
            provinceCode: "CZ",
            addressLine1: "V Parku 2308/10",
            addressLine2: "addres2",
            addressLine3: "addres3",
            countyName: "Central Bohemia",
            provinceName: "Central Bohemia",
            countryName: "Czech Republic",
          },
          contactInformation: {
            email: "that@before.de",
            phone: "+1123456789",
            mobilePhone: "+60112345678",
            companyName: "Company Name",
            fullName: "John Brew",
          },
          registrationNumbers: [
            { typeCode: "VAT", number: "CZ123456789", issuerCountryCode: "CZ" },
          ],
          bankDetails: [
            {
              name: "Russian Bank Name",
              settlementLocalCurrency: "RUB",
              settlementForeignCurrency: "USD",
            },
          ],
          typeCode: "business",
        },
        pickupRequestorDetails: {
          postalAddress: {
            postalCode: "14800",
            cityName: "Prague",
            countryCode: "CZ",
            provinceCode: "CZ",
            addressLine1: "V Parku 2308/10",
            addressLine2: "addres2",
            addressLine3: "addres3",
            countyName: "Central Bohemia",
            provinceName: "Central Bohemia",
            countryName: "Czech Republic",
          },
          contactInformation: {
            email: "that@before.de",
            phone: "+1123456789",
            mobilePhone: "+60112345678",
            companyName: "Company Name",
            fullName: "John Brew",
          },
          registrationNumbers: [
            { typeCode: "VAT", number: "CZ123456789", issuerCountryCode: "CZ" },
          ],
          bankDetails: [
            {
              name: "Russian Bank Name",
              settlementLocalCurrency: "RUB",
              settlementForeignCurrency: "USD",
            },
          ],
          typeCode: "business",
        },
      },
      productCode: "D",
      localProductCode: "D",
      getRateEstimates: false,
      accounts: [{ typeCode: "shipper", number: "123456789" }],
      valueAddedServices: [
        {
          serviceCode: "II",
          value: 100,
          currency: "GBP",
          method: "cash",
          dangerousGoods: [
            {
              contentId: "908",
              dryIceTotalNetWeight: 12,
              customDescription:
                "1 package Lithium ion batteries in compliance with Section II of P.I. 9661",
              unCodes: [1234],
            },
          ],
        },
      ],
      outputImageProperties: {
        printerDPI: 300,
        customerBarcodes: [
          {
            content: "barcode content",
            textBelowBarcode: "text below barcode",
            symbologyCode: "93",
          },
        ],
        customerLogos: [{ fileFormat: "PNG", content: "base64 encoded image" }],
        encodingFormat: "pdf",
        imageOptions: [
          {
            typeCode: "label",
            templateName: "ECOM26_84_001",
            isRequested: true,
            hideAccountNumber: false,
            numberOfCopies: 1,
            invoiceType: "commercial",
            languageCode: "eng",
            languageCountryCode: "br",
            languageScriptCode: "Latn",
            encodingFormat: "png",
            renderDHLLogo: false,
            fitLabelsToA4: false,
            labelFreeText: "string",
            labelCustomerDataText: "string",
            shipmentReceiptCustomerDataText: "string",
          },
        ],
        splitTransportAndWaybillDocLabels: true,
        allDocumentsInOneImage: true,
        splitDocumentsByPages: true,
        splitInvoiceAndReceipt: true,
        receiptAndLabelsInOneImage: true,
      },
      customerReferences: [{ value: "Customer reference", typeCode: "CU" }],
      identifiers: [
        { typeCode: "shipmentId", value: "1234567890", dataIdentifier: "00" },
      ],
      customerDetails: {
        shipperDetails: {
          postalAddress: {
            postalCode: "14800",
            cityName: "Prague",
            countryCode: "CZ",
            provinceCode: "CZ",
            addressLine1: "V Parku 2308/10",
            addressLine2: "addres2",
            addressLine3: "addres3",
            countyName: "Central Bohemia",
            provinceName: "Central Bohemia",
            countryName: "Czech Republic",
          },
          contactInformation: {
            email: "that@before.de",
            phone: "+1123456789",
            mobilePhone: "+60112345678",
            companyName: "Company Name",
            fullName: "John Brew",
          },
          registrationNumbers: [
            { typeCode: "VAT", number: "CZ123456789", issuerCountryCode: "CZ" },
          ],
          bankDetails: [
            {
              name: "Russian Bank Name",
              settlementLocalCurrency: "RUB",
              settlementForeignCurrency: "USD",
            },
          ],
          typeCode: "business",
        },
        receiverDetails: {
          postalAddress: {
            postalCode: "14800",
            cityName: "Prague",
            countryCode: "CZ",
            provinceCode: "CZ",
            addressLine1: "V Parku 2308/10",
            addressLine2: "addres2",
            addressLine3: "addres3",
            countyName: "Central Bohemia",
            provinceName: "Central Bohemia",
            countryName: "Czech Republic",
          },
          contactInformation: {
            email: "that@before.de",
            phone: "+1123456789",
            mobilePhone: "+60112345678",
            companyName: "Company Name",
            fullName: "John Brew",
          },
          registrationNumbers: [
            { typeCode: "VAT", number: "CZ123456789", issuerCountryCode: "CZ" },
          ],
          bankDetails: [
            {
              name: "Russian Bank Name",
              settlementLocalCurrency: "RUB",
              settlementForeignCurrency: "USD",
            },
          ],
          typeCode: "business",
        },
        buyerDetails: {
          postalAddress: {
            postalCode: "14800",
            cityName: "Prague",
            countryCode: "CZ",
            provinceCode: "CZ",
            addressLine1: "V Parku 2308/10",
            addressLine2: "addres2",
            addressLine3: "addres3",
            countyName: "Central Bohemia",
            provinceName: "Central Bohemia",
            countryName: "Czech Republic",
          },
          contactInformation: {
            email: "buyer@domain.com",
            phone: "+44123456789",
            mobilePhone: "+42123456789",
            companyName: "Customer Company Name",
            fullName: "Mark Companer",
          },
          registrationNumbers: [
            { typeCode: "VAT", number: "CZ123456789", issuerCountryCode: "CZ" },
          ],
          bankDetails: [
            {
              name: "Russian Bank Name",
              settlementLocalCurrency: "RUB",
              settlementForeignCurrency: "USD",
            },
          ],
          typeCode: "business",
        },
        importerDetails: {
          postalAddress: {
            postalCode: "14800",
            cityName: "Prague",
            countryCode: "CZ",
            provinceCode: "CZ",
            addressLine1: "V Parku 2308/10",
            addressLine2: "addres2",
            addressLine3: "addres3",
            countyName: "Central Bohemia",
            provinceName: "Central Bohemia",
            countryName: "Czech Republic",
          },
          contactInformation: {
            email: "that@before.de",
            phone: "+1123456789",
            mobilePhone: "+60112345678",
            companyName: "Company Name",
            fullName: "John Brew",
          },
          registrationNumbers: [
            { typeCode: "VAT", number: "CZ123456789", issuerCountryCode: "CZ" },
          ],
          bankDetails: [
            {
              name: "Russian Bank Name",
              settlementLocalCurrency: "RUB",
              settlementForeignCurrency: "USD",
            },
          ],
          typeCode: "business",
        },
        exporterDetails: {
          postalAddress: {
            postalCode: "14800",
            cityName: "Prague",
            countryCode: "CZ",
            provinceCode: "CZ",
            addressLine1: "V Parku 2308/10",
            addressLine2: "addres2",
            addressLine3: "addres3",
            countyName: "Central Bohemia",
            provinceName: "Central Bohemia",
            countryName: "Czech Republic",
          },
          contactInformation: {
            email: "that@before.de",
            phone: "+1123456789",
            mobilePhone: "+60112345678",
            companyName: "Company Name",
            fullName: "John Brew",
          },
          registrationNumbers: [
            { typeCode: "VAT", number: "CZ123456789", issuerCountryCode: "CZ" },
          ],
          bankDetails: [
            {
              name: "Russian Bank Name",
              settlementLocalCurrency: "RUB",
              settlementForeignCurrency: "USD",
            },
          ],
          typeCode: "business",
        },
        sellerDetails: {
          postalAddress: {
            postalCode: "14800",
            cityName: "Prague",
            countryCode: "CZ",
            provinceCode: "CZ",
            addressLine1: "V Parku 2308/10",
            addressLine2: "addres2",
            addressLine3: "addres3",
            countyName: "Central Bohemia",
            provinceName: "Central Bohemia",
            countryName: "Czech Republic",
          },
          contactInformation: {
            email: "that@before.de",
            phone: "+1123456789",
            mobilePhone: "+60112345678",
            companyName: "Company Name",
            fullName: "John Brew",
          },
          registrationNumbers: [
            { typeCode: "VAT", number: "CZ123456789", issuerCountryCode: "CZ" },
          ],
          bankDetails: [
            {
              name: "Russian Bank Name",
              settlementLocalCurrency: "RUB",
              settlementForeignCurrency: "USD",
            },
          ],
          typeCode: "business",
        },
        payerDetails: {
          postalAddress: {
            postalCode: "14800",
            cityName: "Prague",
            countryCode: "CZ",
            provinceCode: "CZ",
            addressLine1: "V Parku 2308/10",
            addressLine2: "addres2",
            addressLine3: "addres3",
            countyName: "Central Bohemia",
            provinceName: "Central Bohemia",
            countryName: "Czech Republic",
          },
          contactInformation: {
            email: "that@before.de",
            phone: "+1123456789",
            mobilePhone: "+60112345678",
            companyName: "Company Name",
            fullName: "John Brew",
          },
          registrationNumbers: [
            { typeCode: "VAT", number: "CZ123456789", issuerCountryCode: "CZ" },
          ],
          bankDetails: [
            {
              name: "Russian Bank Name",
              settlementLocalCurrency: "RUB",
              settlementForeignCurrency: "USD",
            },
          ],
          typeCode: "business",
        },
        manufacturerDetails: {
          postalAddress: {
            postalCode: "14800",
            cityName: "Prague",
            countryCode: "CZ",
            provinceCode: "CZ",
            addressLine1: "V Parku 2308/10",
            addressLine2: "addres2",
            addressLine3: "addres3",
            countyName: "Central Bohemia",
            provinceName: "Central Bohemia",
            countryName: "Czech Republic",
          },
          contactInformation: {
            email: "that@before.de",
            phone: "+1123456789",
            mobilePhone: "+60112345678",
            companyName: "Company Name",
            fullName: "John Brew",
          },
          registrationNumbers: [
            { typeCode: "VAT", number: "CZ123456789", issuerCountryCode: "CZ" },
          ],
          bankDetails: {
            typeCode: "VAT",
            number: "CZ123456789",
            issuerCountryCode: "CZ",
          },
          typeCode: "string",
        },
        ultimateConsigneeDetails: {
          postalAddress: {
            postalCode: "14800",
            cityName: "Prague",
            countryCode: "CZ",
            provinceCode: "CZ",
            addressLine1: "V Parku 2308/10",
            addressLine2: "addres2",
            addressLine3: "addres3",
            countyName: "Central Bohemia",
            provinceName: "Central Bohemia",
            countryName: "Czech Republic",
          },
          contactInformation: {
            email: "that@before.de",
            phone: "+1123456789",
            mobilePhone: "+60112345678",
            companyName: "Company Name",
            fullName: "John Brew",
          },
          registrationNumbers: [
            { typeCode: "VAT", number: "CZ123456789", issuerCountryCode: "CZ" },
          ],
          bankDetails: {
            typeCode: "VAT",
            number: "CZ123456789",
            issuerCountryCode: "CZ",
          },
          typeCode: "string",
        },
        brokerDetails: {
          postalAddress: {
            postalCode: "14800",
            cityName: "Prague",
            countryCode: "CZ",
            provinceCode: "CZ",
            addressLine1: "V Parku 2308/10",
            addressLine2: "addres2",
            addressLine3: "addres3",
            countyName: "Central Bohemia",
            provinceName: "Central Bohemia",
            countryName: "Czech Republic",
          },
          contactInformation: {
            email: "that@before.de",
            phone: "+1123456789",
            mobilePhone: "+60112345678",
            companyName: "Company Name",
            fullName: "John Brew",
          },
          registrationNumbers: [
            { typeCode: "VAT", number: "CZ123456789", issuerCountryCode: "CZ" },
          ],
          bankDetails: {
            typeCode: "VAT",
            number: "CZ123456789",
            issuerCountryCode: "CZ",
          },
          typeCode: "string",
        },
      },
      content: {
        packages: [
          {
            typeCode: "2BP",
            weight: 22.501,
            dimensions: { length: 15.001, width: 15.001, height: 40.001 },
            customerReferences: [
              { value: "Customer reference", typeCode: "CU" },
            ],
            identifiers: [
              {
                typeCode: "shipmentId",
                value: "1234567890",
                dataIdentifier: "00",
              },
            ],
            description: "Piece content description",
            labelBarcodes: [
              {
                position: "left",
                symbologyCode: "93",
                content: "string",
                textBelowBarcode: "text below left barcode",
              },
            ],
            labelText: [
              {
                position: "left",
                caption: "text caption",
                value: "text value",
              },
            ],
            labelDescription: "bespoke label description",
            referenceNumber: 1,
          },
        ],
        isCustomsDeclarable: true,
        declaredValue: 150,
        declaredValueCurrency: "CZK",
        exportDeclaration: {
          lineItems: [
            {
              number: 1,
              description: "line item description",
              price: 150,
              quantity: { value: 1, unitOfMeasurement: "BOX" },
              commodityCodes: [{ typeCode: "outbound", value: 851713 }],
              exportReasonType: "permanent",
              manufacturerCountry: "CZ",
              weight: { netValue: 10, grossValue: 10 },
              isTaxesPaid: true,
              additionalInformation: ["string"],
              customerReferences: [{ typeCode: "AFE", value: "custref123" }],
              customsDocuments: [{ typeCode: "972", value: "custdoc456" }],
              preCalculatedLineItemTotalValue: 150,
            },
          ],
          invoice: {
            number: "12345-ABC",
            date: "2020-03-18",
            signatureName: "Brewer",
            signatureTitle: "Mr.",
            signatureImage: "Base64 encoded image",
            instructions: ["string"],
            customerDataTextEntries: ["string"],
            totalNetWeight: 999999999999,
            totalGrossWeight: 999999999999,
            customerReferences: [{ typeCode: "CU", value: "custref112" }],
            termsOfPayment: "100 days",
            indicativeCustomsValues: {
              importCustomsDutyValue: 150.57,
              importTaxesValue: 49.43,
              totalWithImportDutiesAndTaxes: [350.57],
            },
            preCalculatedTotalValues: {
              preCalculatedTotalGoodsValue: 49.43,
              preCalculatedTotalInvoiceValue: 150.57,
            },
          },
          remarks: [{ value: "declaration remark" }],
          additionalCharges: [
            { value: 10, caption: "fee", typeCode: "freight" },
          ],
          destinationPortName: "port details",
          placeOfIncoterm: "port of departure or destination details",
          payerVATNumber: "12345ED",
          recipientReference: "recipient reference",
          exporter: { id: "123", code: "EXPCZ" },
          packageMarks: "marks",
          declarationNotes: [{ value: "up to three declaration notes" }],
          exportReference: "export reference",
          exportReason: "export reason",
          exportReasonType: "permanent",
          licenses: [{ typeCode: "export", value: "license" }],
          shipmentType: "personal",
          customsDocuments: [{ typeCode: "972", value: "custdoc445" }],
        },
        description: "shipment description",
        USFilingTypeValue: "12345",
        incoterm: "DAP",
        unitOfMeasurement: "metric",
      },
      documentImages: [
        {
          typeCode: "INV",
          imageFormat: "PDF",
          content: "base64 encoded image",
        },
      ],
      onDemandDelivery: {
        deliveryOption: "servicepoint",
        location: "front door",
        specialInstructions: "ringe twice",
        gateCode: "1234",
        whereToLeave: "concierge",
        neighbourName: "Mr.Dan",
        neighbourHouseNumber: "777",
        authorizerName: "Newman",
        servicePointId: "SPL123",
        requestedDeliveryDate: "2020-04-20",
      },
      requestOndemandDeliveryURL: false,
      shipmentNotification: [
        {
          typeCode: "email",
          receiverId: "receiver@email.com",
          languageCode: "eng",
          languageCountryCode: "UK",
          bespokeMessage: "message to be included in the notification",
        },
      ],
      prepaidCharges: [
        { typeCode: "freight", currency: "CZK", value: 200, method: "cash" },
      ],
      getTransliteratedResponse: false,
      estimatedDeliveryDate: { isRequested: false, typeCode: "QDDC" },
      getAdditionalInformation: [
        { typeCode: "pickupDetails", isRequested: true },
      ],
      parentShipment: { productCode: "s", packagesCount: 1 },
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  return <div>dhl</div>;
}
