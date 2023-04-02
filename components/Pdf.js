import React, { useEffect, useState } from "react";

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useData } from "../context/AppWrap";
import { Font } from "@react-pdf/renderer";
import { style } from "@mui/system";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import Logo from "../public/SVG/Logo";
import { Image } from "@react-pdf/renderer";
import { useLayout } from "../context/LayoutContext";
import ButtonPrimary from "./buttons/ButtonPrimary";
import moment from "moment/moment";
import { getTitle, getVariantConfig } from "../lib/helpers";

// Create styles
Font.register({
	family: "Poppins",
	fonts: [
		{
			fontStyle: "normal",
			fontWeight: 400,
			src: "https://fonts.cdnfonts.com/s/16009/Poppins-Regular.woff",
		},
		{
			fontStyle: "normal",
			fontWeight: 600,
			src: "https://fonts.cdnfonts.com/s/16009/Poppins-Bold.woff",
		},
		{
			fontStyle: "normal",
			fontWeight: 500,
			src: "https://fonts.cdnfonts.com/s/16009/Poppins-Medium.woff",
		},
	],
});

function formatSpaces(x) {
	x = x.toString();
	var pattern = /(-?\d+)(\d{3})/;
	while (pattern.test(x)) x = x.replace(pattern, "$1 $2");
	return x;
}

function formatCommas(x) {
	x = x.toString();
	var pattern = /(-?\d+)(\d{3})/;
	while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
	return x;
}

export const DownloadLink = ({ close }) => {
	const {
		data,
		name,
		logo,
		total,
		expiration,
		signature,
		subHeading,
		description,
	} = useData();

	const [displayLink, setdisplayLink] = useState(true);
	const [title, settitle] = useState(name.toLowerCase());
	const layout = useLayout();
	const [pdfUrl, setpdfUrl] = useState(null);
	return (
		<>
			<div>
				<Input
					type='text'
					className='w-full my-6'
					value={title}
					endAdornment='.pdf'
					onChange={(e) => {
						settitle(e.target.value);
					}}
				/>
				{!displayLink && (
					<ButtonPrimary
						className='w-full'
						onClick={() => {
							setdisplayLink(true);
						}}
						scale={0.98}
					>
						Generovať cenovú ponuku
					</ButtonPrimary>
				)}
			</div>
			{displayLink && (
				<PDFDownloadLink
					document={
						<Pdf
							data={data}
							title={name}
							logo={logo}
							isHorizontal={layout?.isHorizontal}
							layout={layout}
							totals={total}
							expiration={expiration}
							signature={signature}
							subHeading={subHeading}
							description={description}
						/>
					}
					fileName={`${title}.pdf`}
					onClick={close}
				>
					{({ blob, url, loading, error }) => (
						<>
							<ButtonPrimary
								disabled={loading}
								color='#63A695'
								onClick={() => {
									null;
								}}
							>
								{loading ? "Načítavam..." : "Stiahnuť ponuku"}
							</ButtonPrimary>
						</>
					)}
				</PDFDownloadLink>
			)}
		</>
	);
};

// Create Document Component
export function Pdf({
	data,
	title,
	logo,
	layout,
	totals,
	isHorizontal,
	signature,
	expiration,
	subHeading,
	description,
}) {
	if (!layout) {
		layout = {
			displayColumns: [
				"title",
				"unit",
				"quantity",
				"total_delivery_price",
				"total_construction_price",
				"total",
			],
			primaryColor: "#63A695",
			isHorizontal: false,
			variant: "pro",
		};
	}
	const variant = getVariantConfig(layout.variant);
	const styles = StyleSheet.create({
		page: {
			backgroundColor: "#fff",
			fontFamily: "Poppins",
			paddingTop: 40,
			paddingBottom: 40,
		},
		logo: {
			maxWidth: 150,
			maxHeight: 80,
			objectFit: "contain",
		},
		row: {
			flexDirection: "row",
			flexGrow: 4,
		},

		infoWraper: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "flex-start",
			alignItems: "flex-start",
		},

		infoHeading: {
			fontFamily: "Poppins",
			fontSize: 14,
			fontWeight: 500,
			marginBottom: 4,
			color: "#d1d5db",
		},

		section: {
			marginHorizontal: 40,
			marginVertical: 10,
		},
		heading: {
			fontFamily: "Poppins",
			fontSize: 26,
			fontWeight: 500,
		},

		name: {
			marginVertical: 30,
		},

		blockSummary: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "flex-start",
			marginTop: 8,
			width: "100%",
		},

		blockHeading: {
			fontFamily: "Poppins",
			fontSize: 15,
			fontWeight: 600,
			marginBottom: 10,
		},

		line: {
			width: "100%",
			height: "0.4px",
			backgroundColor: "#000",
		},

		text: {
			fontFamily: "Poppins",
			fontSize: 10,
		},

		textBold: {
			fontFamily: "Poppins",
			fontSize: 10,
			fontWeight: 600,
		},

		tableRow: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			backgroundColor: "#f3f4f6",
		},

		tableHeading: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			fontWeight: 500,
			//paddingVertical:6,
			backgroundColor: layout.primaryColor,
			color: "#fff",
			paddingHorizontal: 4,
			paddingVertical: 6,
		},

		headerUnit: {
			paddingRight: 6,
			paddingLeft: 4,
			paddingTop: 2,
			paddingBottom: 2,
		},

		tableText: {
			fontSize: 8,
		},

		col_service_type: {
			width: 30,
			fontSize: 8,
		},
		col_item_id: {
			width: 80,
			fontSize: 8,
		},
		col_title: {
			width: "100%",
			fontSize: 8,
			paddingRight: 16,
		},
		col_unit: {
			width: 50,
			fontSize: 8,
		},
		col_quantity: {
			width: 60,
			fontSize: 8,
		},
		col_unit_delivery_price: {
			width: 100,
			fontSize: 8,
		},
		col_unit_construction_price: {
			width: 100,
			fontSize: 8,
		},
		col_total_delivery_price: {
			width: 100,
			fontSize: 8,
		},
		col_total_construction_price: {
			width: 100,
			fontSize: 8,
		},

		col_total: {
			width: 100,
			fontSize: 8,
		},
		tableUnit: {
			borderBottom: "1px solid #d1d5db",
			borderRight: "1px solid #d1d5db",
			height: "100%",
			paddingRight: 6,
			paddingLeft: 4,
			paddingVertical: 4,
			marginVertical: "auto",
		},

		tableUnitFirst: {
			borderLeft: "1px solid #d1d5db",
		},

		footer: {
			position: "absolute",
			fontSize: 12,
			bottom: 20,
			left: 40,
			right: 40,
			fontFamily: "Poppins",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			flexDirection: "row",
		},
		footerText: {
			fontSize: 8,
		},

		header: {
			position: "absolute",
			fontSize: 12,
			top: 20,
			left: 20,
			right: 20,
			fontFamily: "Poppins",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			flexDirection: "row",
		},
		headerText: {
			fontSize: 8,
		},

		sectionWrap: {
			border: "1px solid #e5e7eb",
			padding: 24,
		},

		sectionHeading: {
			fontSize: 14,
			fontWeight: 400,
			textAlign: "center",
			marginBottom: 20,
		},
	});

	return (
		<Document title={title}>
			<Page
				orientation={isHorizontal ? "landscape" : "portrait"}
				size='A4'
				style={styles.page}
			>
				<View>
					<View
						style={{
							height: 60,
							backgroundColor: layout.primaryColor,
							width: "100%",
							marginTop: "-40px",
						}}
					></View>

					<View style={[styles.section, { marginBottom: 40 }]}>
						<View
							style={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								marginTop: 20,
							}}
						>
							<View>
								<Text style={styles.heading}>Cenová ponuka</Text>
								<Text style={styles.infoHeading}>{subHeading}</Text>
							</View>

							<View>
								{logo && <Image cache={false} style={styles.logo} src={logo} />}
							</View>
						</View>
					</View>

					<View style={[styles.infoWraper, styles.section]}>
						<View style={[{ marginRight: 40 }]}>
							<Text style={styles.infoHeading}>OBJEDNÁVATEĽ</Text>
							<Text style={styles.text}>{data.customer.name}</Text>
						</View>

						<View style={{ marginRight: 40 }}>
							<Text style={styles.infoHeading}>DODÁVATEĽ:</Text>
							<Text style={styles.text}>{data.supplyer.company_name}</Text>
							{data.supplyer.ico && (
								<Text style={styles.text}>IČO: {data.supplyer.ico}</Text>
							)}
							{data.supplyer.dic && (
								<Text style={styles.text}>DIČ: {data.supplyer.dic}</Text>
							)}
							{data.supplyer.phone && (
								<Text style={styles.text}>Tel.: {data.supplyer.phone}</Text>
							)}
							{data.supplyer.email && (
								<Text style={styles.text}>{data.supplyer.email}</Text>
							)}
							<Text style={styles.text}>{data.supplyer.web}</Text>
						</View>

						<View>
							<Text style={styles.infoHeading}>CENA:</Text>
							<Text style={styles.text}>
								Cena montáže celkom:{" "}
								{formatSpaces(totals.total_construction_price.toFixed(2))} €
							</Text>
							<Text style={styles.text}>
								Cena dodávky celkom:{" "}
								{formatSpaces(totals.total_delivery_price.toFixed(2))} €
							</Text>
							<Text style={[styles.text]}>
								Spolu:{" "}
								{formatSpaces((totals.total + totals.total * 0.2).toFixed(2))} €
								s DPH
							</Text>
							{/* <Text style={[styles.text]}>
							DPH 20%: {formatSpaces((totals.total.toFixed(2) * 0.2).toFixed(2))} €{" "}
						</Text> */}
							<View>
								<Text
									style={[styles.textBold, { fontSize: 13, marginTop: 10 }]}
								>
									Cena Spolu:
								</Text>
								<Text style={[styles.textBold, { fontSize: 13 }]}>
									{formatSpaces(totals.total.toFixed(2))} €
									<Text style={{ fontSize: 10 }}> bez DPH</Text>
								</Text>
							</View>
						</View>
					</View>

					<View style={[styles.section, { paddingBottom: "20" }]}>
						<View style={styles.line}></View>
						<Text
							style={[
								styles.heading,
								{ textAlign: "center", fontSize: "14", marginVertical: "8" },
							]}
						>
							{title}
						</Text>
						{description && (
							<Text
								style={{
									fontSize: 10,
									textAlign: "center",
									color: "#9CA3AF",
									marginBottom: 20,
								}}
							>
								{description}
							</Text>
						)}
						<View style={styles.line}></View>
					</View>
				</View>

				{data.sections.map((section, sectionId) => {
					return (
						<View break={sectionId && variant.sectionWrap}>
							<View style={[styles.section, styles.sectionWrap]}>
								<Text style={styles.sectionHeading}>{section.info.title}</Text>
								<View style={styles.blockSummary}>
									<View style={{ marginRight: 18 }}>
										<Text style={[styles.text]}>Cena dodávky celkom:</Text>
										<Text style={[styles.text]}>
											{formatSpaces(
												parseFloat(section.info.total_delivery_price).toFixed(2)
											)}
											€
										</Text>
									</View>

									<View style={{ marginRight: 18 }}>
										<Text style={[styles.text]}>Cena montáže celkom:</Text>
										<Text style={[styles.text]}>
											{formatSpaces(
												parseFloat(
													section.info.total_construction_price
												).toFixed(2)
											)}{" "}
											€
										</Text>
									</View>

									<View>
										<Text style={[styles.textBold]}>Spolu:</Text>
										<Text style={[styles.textBold]}>
											{formatSpaces(parseFloat(section.info.total).toFixed(2))}{" "}
											€
										</Text>
									</View>
								</View>
								{variant.sectionSummary && (
									<View style={[{ marginTop: 10 }]} wrap={false}>
										<View>
											<View style={styles.tableHeading}>
												<Text style={{ fontSize: 8, width: 40 }}>N.</Text>
												<Text
													style={[
														styles[`col_title`],
														{ width: "100%" },
														styles.headerUnit,
													]}
												>
													Položka
												</Text>
												<Text
													style={[
														styles[`col_total_delivery_price`],
														{ width: 150 },
														styles.headerUnit,
													]}
												>
													Cena montáže
												</Text>
												<Text
													style={[
														styles[`col_total_delivery_price`],
														{ width: 150 },
														styles.headerUnit,
													]}
												>
													Cena dodávky
												</Text>
												<Text
													style={[
														styles[`col_total_delivery_price`],
														{ width: 150 },
														styles.headerUnit,
													]}
												>
													Cena spolu
												</Text>
											</View>
											{section?.blocks.map((block, itemId) => {
												return (
													<View style={styles.tableRow}>
														<Text
															style={[
																{ fontSize: 8, width: 40 },
																styles.tableUnit,
																styles.tableUnitFirst,
															]}
														>
															{itemId + 1}
														</Text>
														<Text
															style={[
																styles[`col_title`],
																{ width: "100%" },
																styles.tableUnit,
															]}
														>
															{block.info.title}
														</Text>
														<Text
															style={[
																styles[`col_total_delivery_price`],
																{ width: 150 },
																styles.tableUnit,
															]}
														>
															{parseFloat(
																block.info.total_construction_price
															).toFixed(2)}{" "}
															€
														</Text>
														<Text
															style={[
																styles[`col_total_delivery_price`],
																{ width: 150 },
																styles.tableUnit,
															]}
														>
															{parseFloat(
																block.info.total_delivery_price
															).toFixed(2)}{" "}
															€
														</Text>
														<Text
															style={[
																styles[`col_total_delivery_price`],
																{ width: 150 },
																styles.tableUnit,
															]}
														>
															{parseFloat(block.info.total).toFixed(2)} €
														</Text>
													</View>
												);
											})}
										</View>
									</View>
								)}
							</View>

							{variant.blocks &&
								section.blocks.map((block, i) => {
									return (
										<View
											style={[styles.section, { marginBottom: 30 }]}
											wrap={false}
										>
											<Text style={styles.blockHeading}>
												{i + 1}. {block.info.title}
											</Text>
											<View>
												{block.items.length > 0 && (
													<View style={styles.tableHeading}>
														<Text style={{ fontSize: 8, width: 40 }}>N.</Text>
														{data.headers.map((header, i) => {
															if (layout.displayColumns.includes(header)) {
																return (
																	<Text
																		style={[
																			styles[`col_${header}`],
																			styles.headerUnit,
																		]}
																	>
																		{getTitle(header, "sk").short}
																	</Text>
																);
															}
														})}
													</View>
												)}
												{variant.table &&
													block?.items.map((item, itemId) => {
														return (
															<View style={styles.tableRow}>
																<Text
																	style={[
																		{ fontSize: 8, width: 40 },
																		styles.tableUnit,
																		styles.tableUnitFirst,
																	]}
																>
																	{itemId + 1}
																</Text>
																{data.headers.map((header, i) => {
																	if (layout.displayColumns.includes(header)) {
																		const displayCurrency = [
																			"unit_delivery_price",
																			"unit_construction_price",
																			"total_delivery_price",
																			"total_construction_price",
																			"total",
																		];
																		return (
																			<Text
																				style={[
																					styles[`col_${header}`],
																					styles.tableUnit,
																				]}
																			>
																				{!isNaN(item[header])
																					? parseFloat(item[header]).toFixed(2)
																					: item[header]}
																				{displayCurrency.includes(header) &&
																					" €"}
																			</Text>
																		);
																	}
																})}
															</View>
														);
													})}
											</View>
											<View style={styles.blockSummary}>
												<Text style={[styles.text, { marginRight: 18 }]}>
													Cena dodávky celkom:{" "}
													{formatSpaces(
														block.info.total_delivery_price.toFixed(2)
													)}{" "}
													€
												</Text>
												<Text style={[styles.text, { marginRight: 18 }]}>
													Cena montáže celkom:{" "}
													{formatSpaces(
														block.info.total_construction_price.toFixed(2)
													)}{" "}
													€
												</Text>
												<Text style={[styles.textBold, { marginRight: 18 }]}>
													Spolu:{" "}
													{formatSpaces(
														(
															block.info.total_delivery_price +
															block.info.total_construction_price
														).toFixed(2)
													)}{" "}
													€
												</Text>
											</View>
										</View>
									);
								})}
						</View>
					);
				})}

				{variant.summary && (
					<View style={styles.section}>
						<Text>Zhrnutie:</Text>
						<View>
							{data.sections.map((section, i) => {
								return (
									<View style={[{ marginBottom: 30 }]} wrap={false}>
										<Text style={styles.blockHeading}>
											{section.info.title}
										</Text>
										<View>
											<View style={styles.tableHeading}>
												<Text style={{ fontSize: 8, width: 40 }}>N.</Text>
												<Text
													style={[
														styles[`col_title`],
														{ width: "100%" },
														styles.headerUnit,
													]}
												>
													Práce
												</Text>
												<Text
													style={[
														styles[`col_total_delivery_price`],
														{ width: 180 },
														styles.headerUnit,
													]}
												>
													Cena montáže
												</Text>
												<Text
													style={[
														styles[`col_total_delivery_price`],
														{ width: 180 },
														styles.headerUnit,
													]}
												>
													Cena dodávky
												</Text>
												<Text
													style={[
														styles[`col_total_delivery_price`],
														{ width: 180 },
														styles.headerUnit,
													]}
												>
													Cena spolu
												</Text>
											</View>
											{section?.blocks.map((block, itemId) => {
												return (
													<View style={styles.tableRow}>
														<Text
															style={[
																{ fontSize: 8, width: 40 },
																styles.tableUnit,
																styles.tableUnitFirst,
															]}
														>
															{itemId + 1}
														</Text>
														<Text
															style={[
																styles[`col_title`],
																{ width: "100%" },
																styles.tableUnit,
															]}
														>
															{block.info.title}
														</Text>
														<Text
															style={[
																styles[`col_total_delivery_price`],
																{ width: 180 },
																styles.tableUnit,
															]}
														>
															{parseFloat(
																block.info.total_construction_price
															).toFixed(2)}{" "}
															€
														</Text>
														<Text
															style={[
																styles[`col_total_delivery_price`],
																{ width: 180 },
																styles.tableUnit,
															]}
														>
															{parseFloat(
																block.info.total_delivery_price
															).toFixed(2)}{" "}
															€
														</Text>
														<Text
															style={[
																styles[`col_total_delivery_price`],
																{ width: 180 },
																styles.tableUnit,
															]}
														>
															{parseFloat(block.info.total).toFixed(2)} €
														</Text>
													</View>
												);
											})}
										</View>
									</View>
								);
							})}
						</View>

						<View>
							<Text style={{ font: 26, fontWeight: 500 }}>
								Cena Spolu: {formatSpaces(totals.total.toFixed(2))}€
								<Text style={{ fontSize: 12, fontWeight: 800 }}> bez DPH</Text>
							</Text>
						</View>
					</View>
				)}

				<View style={[styles.section, { position: "absolute", bottom: 80 }]}>
					<Footer
						name={data.supplyer.company_name}
						signature={signature}
						expiration={expiration}
					></Footer>
				</View>

				<View style={styles.footer} fixed>
					<Text style={styles.footerText}>{data.supplyer.company_name}</Text>

					<Text
						style={styles.footerText}
						render={({ pageNumber, totalPages }) =>
							`${pageNumber} / ${totalPages}`
						}
						fixed
					/>

					<Text style={styles.footerText}>
						{new Date().toLocaleDateString()}
					</Text>
				</View>
			</Page>
		</Document>
	);
}

function Footer({ signature, expiration, name }) {
	const styles = StyleSheet.create({
		wrap: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			marginTop: "",
		},
		section: {
			marginHorizontal: 40,
			marginVertical: 10,
		},
		info: {
			width: "50%",
		},
		signature: {
			width: "50%",
		},
		text: {
			fontSize: 11,
			color: "#9CA3AF",
		},
		heading: {
			fontSize: 11,
			color: "black",
		},
		img: {
			width: 200,
			marginLeft: "auto",
		},
	});
	return (
		<View>
			<View style={styles.wrap}>
				<View style={styles.info}>
					<View style={{ marginBottom: 10 }}>
						<Text style={styles.heading}>Ponuku vypracoval:</Text>
						<Text style={styles.text}>{name}</Text>
					</View>
					<View>
						<Text style={styles.heading}>Platnosť cenovej ponuky:</Text>
						<Text style={styles.text}>
							do {moment(expiration).format("DD.MM.YYYY")}
						</Text>
					</View>
				</View>
				<View style={styles.signature}>
					{signature && (
						<Image cache={false} style={styles.img} src={signature} />
					)}
				</View>
			</View>
			<View
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					marginTop: 10,
				}}
			>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "baseline",
						marginTop: 10,
					}}
				>
					<Text style={{ fontSize: 8, marginRight: 4 }}>
						Vytvorené pomocou aplikácie
					</Text>
					<Image
						style={{ width: 50 }}
						src={
							"https://firebasestorage.googleapis.com/v0/b/cenova-ponuka.appspot.com/o/logo.png?alt=media&token=7feca9b6-0f78-4883-b98c-ea07f8109686"
						}
					></Image>
				</View>
				<Text style={{ fontSize: 8, marginTop: 4 }}>nacento.online</Text>
			</View>
		</View>
	);
}
