//package com.bs.configuration;
//
//import javax.sql.DataSource;
//
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class DataSourceConfig {
//	@Bean
//	public DataSource getDataSource() {
//		return DataSourceBuilder.create().driverClassName("com.mysql.cj.jdbc.Driver")
//				.url("jdbc:mysql://localhost:3306/Book_managment").username("belcaid").password("belcaid2001").build();
//	}
//}
//