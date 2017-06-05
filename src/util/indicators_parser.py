import csv
import json
import sys
import xlrd
class IndicatorsParser(object):

    c = []
    def get_indicator_json_from_csv(self, csv_file_name):
        """
        takes csv & constructs required json
        :param csv_file_name: string file name
        """
        with open(csv_file_name) as csvfile:
            reader = csv.DictReader(csvfile)
            for index, row in enumerate(reader):
                if index == 0:
                    c = self.createRow(row)
                    continue
                for index, k in enumerate(c):
                    if k["indicatorGroup"] == "ANC":
                        for index2, subIndicator in enumerate(k["subIndicators"]):
                            if subIndicator["indicator"] == "% registered before 12 weeks":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "percentage_pregnant_women_registered_before_12_weeks_against_total"),
                                )
                            elif subIndicator["indicator"] == "% received 3 checkups":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "percentage_pregnant_women_received_3_checkups"),
                                )
                            elif subIndicator["indicator"] == "% women given tt 1-2 & booster":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "percentage_pregnant_women_given_TT_and_booster"),
                                )
                            elif subIndicator["indicator"] == "% women given ifa tablets":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "percentage_pregnant_women_given_IFA_tables"),
                                )
                            elif subIndicator["indicator"] == "# of hrp":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "Total number of HRP "),
                                )
                    elif k["indicatorGroup"] == "Immunization":
                        for index2, subIndicator in enumerate(k["subIndicators"]):
                            if subIndicator["indicator"] == "% zero dose childrens":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "percentage_given_zero_dose_to_children_against_total_live_birth"),
                                )
                            elif subIndicator["indicator"] == "% children full immunized":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "percentatge_childeren_full_immunized"),
                                )
                            elif subIndicator["indicator"] == "% children full immunized":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "percentatge_childeren_full_immunized"),
                                )
                    elif k["indicatorGroup"] == "Deliveries":
                        for index2, subIndicator in enumerate(k["subIndicators"]):
                            if subIndicator["indicator"] == "# institutional deliveries":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row,
                                              "Number of institutional deliveries against to total number of deliveries"),
                                )
                            elif subIndicator["indicator"] == "# complicated pregnancies":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row,
                                              "Number of Complicated pregnancies treated including C-Section     (      )"),
                                )
                            elif subIndicator["indicator"] == "# delivery cases reffered":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "Number of delievery cases reffered at higher facilities"),
                                )
                            elif subIndicator["indicator"] == "# of live birth":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "Total number of live birth"),
                                )
                            elif subIndicator["indicator"] == "# of newborn > 2.5kg":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "Number of Newborn having weighed > 2.5 kg"),
                                )
                    elif k["indicatorGroup"] == "PostNatalCare":
                        for index2, subIndicator in enumerate(k["subIndicators"]):
                            if subIndicator["indicator"] == "women post partum":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "Women receiving post partum check-up within 48 hours after delivery"),
                                )
                            elif subIndicator["indicator"] == "New born post natal":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "New borns received 6 post natal HBNC visit"),
                                )
                    elif k["indicatorGroup"] == "NoOfDeaths":
                        for index2, subIndicator in enumerate(k["subIndicators"]):
                            if subIndicator["indicator"] == "mmr":
                                c[index]["subIndicators"][index2]["SHCFigures"].append(
                                    self.createSHC(row, "MMR"),
                                )


        data = json.dumps(c)
        with open("indicators.json", 'w') as json_file:
            json_file.write(data)
        print "json extracted in indicators.json"

    def createSHC(self, row, key):
        """
        create SHC level json
        :param row:
        :param key:
        :return: SHC level json
        """
        return {
            "SHC": row["SHC"],
            "figures": [
                {
                    "ActualTargetAchievedPercentage": [
                        {
                            "June": row[key],
                        }
                    ]
                }
            ]
        }

    def createRow(self, row):
        """
            create SHC level json
            :param row:
            :param key:
            :return: SHC level json
            """
        return [
            {
                "indicatorGroup": "ANC",
                "subIndicators": [
                    {
                        "SHCFigures": [
                            self.createSHC(row, "percentage_pregnant_women_registered_before_12_weeks_against_total"),
                        ],
                        "indicator": "% registered before 12 weeks",
                        "slugIndicator": "pc_reg_before_12_weeeks",
                        "unit": "Percentage",
                    },
                    {
                        "SHCFigures": [
                            self.createSHC(row, "percentage_pregnant_women_received_3_checkups"),
                        ],
                        "indicator": "% received 3 checkups",
                        "slugIndicator": "pc_rec_3_checkups",
                        "unit": "Percentage",
                    },
                    {
                        "SHCFigures": [
                            self.createSHC(row, "percentage_pregnant_women_given_TT_and_booster"),
                        ],
                        "indicator": "% women given tt 1-2 & booster",
                        "slugIndicator": "pc_rec_tt_booster",
                        "unit": "Percentage",
                    },
                    {
                        "SHCFigures": [
                            self.createSHC(row, "percentage_pregnant_women_given_IFA_tables"),
                        ],
                        "indicator": "% women given ifa tablets",
                        "slugIndicator": "pc_rec_ifa_tablets",
                        "unit": "Percentage",
                    },
                    {
                        "SHCFigures": [
                            self.createSHC(row, "Total number of HRP "),
                        ],
                        "indicator": "# of hrp",
                        "slugIndicator": "#_of_hrp",
                        "unit": "Number",
                    },
                ]
            },
            {
                "indicatorGroup": "Immunization",
                "subIndicators": [
                    {
                        "SHCFigures": [
                            self.createSHC(row, "percentage_given_zero_dose_to_children_against_total_live_birth"),
                        ],
                        "indicator": "% zero dose childrens",
                        "slugIndicator": "pc_zero_dose_children",
                        "unit": "Percentage",
                    },
                    {
                        "SHCFigures": [
                            self.createSHC(row, "percentatge_childeren_full_immunized"),
                        ],
                        "indicator": "% children full immunized",
                        "slugIndicator": "pc_children_full_immunized",
                        "unit": "Percentage",
                    },
                ]
            },
            {
                "indicatorGroup": "Deliveries",
                "subIndicators": [
                    {
                        "SHCFigures": [
                            self.createSHC(row,
                                           "Number of institutional deliveries against to total number of deliveries"),
                        ],
                        "indicator": "# institutional deliveries",
                        "slugIndicator": "#_institutional_deliveries",
                        "unit": "Number",
                    },
                    {
                        "SHCFigures": [
                            self.createSHC(row,
                                           "Number of Complicated pregnancies treated including C-Section     (      )"),
                        ],
                        "indicator": "# complicated pregnancies",
                        "slugIndicator": "#_complicated_pregnancies",
                        "unit": "Number",
                    },
                    {
                        "SHCFigures": [
                            self.createSHC(row, "Number of delievery cases reffered at higher facilities"),
                        ],
                        "indicator": "# delivery cases reffered",
                        "slugIndicator": "#_delivery_cases_reffered",
                        "unit": "Number",
                    },
                    {
                        "SHCFigures": [
                            self.createSHC(row, "Total number of live birth"),
                        ],
                        "indicator": "# of live birth",
                        "slugIndicator": "#_live_birth",
                        "unit": "Number",
                    },
                    {
                        "SHCFigures": [
                            self.createSHC(row, "Number of Newborn having weighed > 2.5 kg"),
                        ],
                        "indicator": "# of newborn > 2.5kg",
                        "slugIndicator": "#_newborn_2.5kg",
                        "unit": "Number",
                    },
                ]
            },
            {
                "indicatorGroup": "PostNatalCare",
                "subIndicators": [
                    {
                        "SHCFigures": [
                            self.createSHC(row, "Women receiving post partum check-up within 48 hours after delivery"),
                        ],
                        "indicator": "women post partum",
                        "slugIndicator": "#_women_post_partum",
                        "unit": "Number",
                    },
                    {
                        "SHCFigures": [
                            self.createSHC(row, "New borns received 6 post natal HBNC visit"),
                        ],
                        "indicator": "New born post natal",
                        "slugIndicator": "#_new_born_post_natal",
                        "unit": "Number",
                    },
                ]
            },
            {
                "indicatorGroup": "NoOfDeaths",
                "subIndicators": [
                    {
                        "SHCFigures": [
                            self.createSHC(row, "MMR"),
                        ],
                        "indicator": "mmr",
                        "slugIndicator": "#_mmr",
                        "unit": "Number",
                    },
                ]
            },
        ]



if __name__ == '__main__':
    indicator = IndicatorsParser()

    if len(sys.argv) <= 1:
        print "Please give CSV file path (Export CSV from the Indicator's Sheet1"
        sys.exit(0)
    indicator.get_indicator_json_from_csv(sys.argv[1])