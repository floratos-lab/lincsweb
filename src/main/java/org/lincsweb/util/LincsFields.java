package org.lincsweb.util;

import java.io.InputStream;
import java.io.IOException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import org.lincsweb.data.LincsFieldInfo;

public class LincsFields {

	private static final String FIELD_DESCRIPTION_FILE = "/lincs_description.xml";

	private LincsFieldInfo fieldInfo = null;
	static LincsFields instance = null;

	public LincsFields() {
		InputStream inputStream = null;
		try {
			inputStream = this.getClass().getClassLoader()
					.getResourceAsStream(FIELD_DESCRIPTION_FILE);
			if (inputStream != null) {

				DocumentBuilderFactory factory = DocumentBuilderFactory
						.newInstance();
				DocumentBuilder builder;

				builder = factory.newDocumentBuilder();
				Document doc = builder.parse(inputStream);
				fieldInfo = new LincsFieldInfo();
				Node fieldsNode = doc.getElementsByTagName("fields").item(0);
				NodeList childNodelist = fieldsNode.getChildNodes();
				// String nodeName =null;
				int size = childNodelist.getLength();

				for (int i = 0; i < size; i++) {
					Node node = childNodelist.item(i);
					String nodeName = node.getNodeName();
					if (nodeName.startsWith("#"))
						continue;
					else if (node.getNodeName().equals("TissueType"))
						fieldInfo.setTissueType(getNodeValue(node));
					else if (node.getNodeName().equals("CellLine"))
						fieldInfo.setCellLine(getNodeValue(node));
					else if (node.getNodeName().equals("Drug1"))
						fieldInfo.setDrug1(getNodeValue(node));
					else if (node.getNodeName().equals("Drug2"))
						fieldInfo.setDrug2(getNodeValue(node));
					else if (node.getNodeName().equals("AssayType"))
						fieldInfo.setAssayType(getNodeValue(node));
					else if (node.getNodeName().equals("SynergyMeasure"))
						fieldInfo.setSynergyMeasure(getNodeValue(node));
					else if (node.getNodeName().equals("SimilarityAlgorithm"))
						fieldInfo.setSimilarityAlgorithm(getNodeValue(node));
					else if (node.getNodeName().equals("Score"))
						fieldInfo.setScore(getNodeValue(node));
					else if (node.getNodeName().equals("ScoreError"))
						fieldInfo.setScoreError(getNodeValue(node));
					else if (node.getNodeName().equals("Pvalue"))
						fieldInfo.setPvalue(getNodeValue(node));

				}

			}
		} catch (IOException ie) {

			ie.printStackTrace();

		} catch (ParserConfigurationException pe) {

			pe.printStackTrace();
		} catch (SAXException se) {

			se.printStackTrace();
		}
	}

	public static LincsFields getInstance() {
		if (instance == null)
			instance = new LincsFields();

		return instance;
	}

	public LincsFieldInfo getLincsFieldInfo() {
		return fieldInfo;
	}

	protected String getNodeValue(Node node) {
		NodeList childNodes = node.getChildNodes();
		for (int x = 0; x < childNodes.getLength(); x++) {
			Node data = childNodes.item(x);
			if (data.getNodeType() == Node.TEXT_NODE)
				return data.getNodeValue();
		}
		return "";
	}

}
