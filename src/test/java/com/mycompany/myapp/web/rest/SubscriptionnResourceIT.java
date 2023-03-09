package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Subscriptionn;
import com.mycompany.myapp.repository.SubscriptionnRepository;
import java.util.List;
import java.util.UUID;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link SubscriptionnResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SubscriptionnResourceIT {

    private static final String ENTITY_API_URL = "/api/subscriptionns";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private SubscriptionnRepository subscriptionnRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSubscriptionnMockMvc;

    private Subscriptionn subscriptionn;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subscriptionn createEntity(EntityManager em) {
        Subscriptionn subscriptionn = new Subscriptionn();
        return subscriptionn;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subscriptionn createUpdatedEntity(EntityManager em) {
        Subscriptionn subscriptionn = new Subscriptionn();
        return subscriptionn;
    }

    @BeforeEach
    public void initTest() {
        subscriptionn = createEntity(em);
    }

    @Test
    @Transactional
    void createSubscriptionn() throws Exception {
        int databaseSizeBeforeCreate = subscriptionnRepository.findAll().size();
        // Create the Subscriptionn
        restSubscriptionnMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(subscriptionn)))
            .andExpect(status().isCreated());

        // Validate the Subscriptionn in the database
        List<Subscriptionn> subscriptionnList = subscriptionnRepository.findAll();
        assertThat(subscriptionnList).hasSize(databaseSizeBeforeCreate + 1);
        Subscriptionn testSubscriptionn = subscriptionnList.get(subscriptionnList.size() - 1);
    }

    @Test
    @Transactional
    void createSubscriptionnWithExistingId() throws Exception {
        // Create the Subscriptionn with an existing ID
        subscriptionn.setId("existing_id");

        int databaseSizeBeforeCreate = subscriptionnRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscriptionnMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(subscriptionn)))
            .andExpect(status().isBadRequest());

        // Validate the Subscriptionn in the database
        List<Subscriptionn> subscriptionnList = subscriptionnRepository.findAll();
        assertThat(subscriptionnList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSubscriptionns() throws Exception {
        // Initialize the database
        subscriptionn.setId(UUID.randomUUID().toString());
        subscriptionnRepository.saveAndFlush(subscriptionn);

        // Get all the subscriptionnList
        restSubscriptionnMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subscriptionn.getId())));
    }

    @Test
    @Transactional
    void getSubscriptionn() throws Exception {
        // Initialize the database
        subscriptionn.setId(UUID.randomUUID().toString());
        subscriptionnRepository.saveAndFlush(subscriptionn);

        // Get the subscriptionn
        restSubscriptionnMockMvc
            .perform(get(ENTITY_API_URL_ID, subscriptionn.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(subscriptionn.getId()));
    }

    @Test
    @Transactional
    void getNonExistingSubscriptionn() throws Exception {
        // Get the subscriptionn
        restSubscriptionnMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingSubscriptionn() throws Exception {
        // Initialize the database
        subscriptionn.setId(UUID.randomUUID().toString());
        subscriptionnRepository.saveAndFlush(subscriptionn);

        int databaseSizeBeforeUpdate = subscriptionnRepository.findAll().size();

        // Update the subscriptionn
        Subscriptionn updatedSubscriptionn = subscriptionnRepository.findById(subscriptionn.getId()).get();
        // Disconnect from session so that the updates on updatedSubscriptionn are not directly saved in db
        em.detach(updatedSubscriptionn);

        restSubscriptionnMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSubscriptionn.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSubscriptionn))
            )
            .andExpect(status().isOk());

        // Validate the Subscriptionn in the database
        List<Subscriptionn> subscriptionnList = subscriptionnRepository.findAll();
        assertThat(subscriptionnList).hasSize(databaseSizeBeforeUpdate);
        Subscriptionn testSubscriptionn = subscriptionnList.get(subscriptionnList.size() - 1);
    }

    @Test
    @Transactional
    void putNonExistingSubscriptionn() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionnRepository.findAll().size();
        subscriptionn.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscriptionnMockMvc
            .perform(
                put(ENTITY_API_URL_ID, subscriptionn.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(subscriptionn))
            )
            .andExpect(status().isBadRequest());

        // Validate the Subscriptionn in the database
        List<Subscriptionn> subscriptionnList = subscriptionnRepository.findAll();
        assertThat(subscriptionnList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSubscriptionn() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionnRepository.findAll().size();
        subscriptionn.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubscriptionnMockMvc
            .perform(
                put(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(subscriptionn))
            )
            .andExpect(status().isBadRequest());

        // Validate the Subscriptionn in the database
        List<Subscriptionn> subscriptionnList = subscriptionnRepository.findAll();
        assertThat(subscriptionnList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSubscriptionn() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionnRepository.findAll().size();
        subscriptionn.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubscriptionnMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(subscriptionn)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Subscriptionn in the database
        List<Subscriptionn> subscriptionnList = subscriptionnRepository.findAll();
        assertThat(subscriptionnList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSubscriptionnWithPatch() throws Exception {
        // Initialize the database
        subscriptionn.setId(UUID.randomUUID().toString());
        subscriptionnRepository.saveAndFlush(subscriptionn);

        int databaseSizeBeforeUpdate = subscriptionnRepository.findAll().size();

        // Update the subscriptionn using partial update
        Subscriptionn partialUpdatedSubscriptionn = new Subscriptionn();
        partialUpdatedSubscriptionn.setId(subscriptionn.getId());

        restSubscriptionnMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSubscriptionn.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSubscriptionn))
            )
            .andExpect(status().isOk());

        // Validate the Subscriptionn in the database
        List<Subscriptionn> subscriptionnList = subscriptionnRepository.findAll();
        assertThat(subscriptionnList).hasSize(databaseSizeBeforeUpdate);
        Subscriptionn testSubscriptionn = subscriptionnList.get(subscriptionnList.size() - 1);
    }

    @Test
    @Transactional
    void fullUpdateSubscriptionnWithPatch() throws Exception {
        // Initialize the database
        subscriptionn.setId(UUID.randomUUID().toString());
        subscriptionnRepository.saveAndFlush(subscriptionn);

        int databaseSizeBeforeUpdate = subscriptionnRepository.findAll().size();

        // Update the subscriptionn using partial update
        Subscriptionn partialUpdatedSubscriptionn = new Subscriptionn();
        partialUpdatedSubscriptionn.setId(subscriptionn.getId());

        restSubscriptionnMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSubscriptionn.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSubscriptionn))
            )
            .andExpect(status().isOk());

        // Validate the Subscriptionn in the database
        List<Subscriptionn> subscriptionnList = subscriptionnRepository.findAll();
        assertThat(subscriptionnList).hasSize(databaseSizeBeforeUpdate);
        Subscriptionn testSubscriptionn = subscriptionnList.get(subscriptionnList.size() - 1);
    }

    @Test
    @Transactional
    void patchNonExistingSubscriptionn() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionnRepository.findAll().size();
        subscriptionn.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubscriptionnMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, subscriptionn.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(subscriptionn))
            )
            .andExpect(status().isBadRequest());

        // Validate the Subscriptionn in the database
        List<Subscriptionn> subscriptionnList = subscriptionnRepository.findAll();
        assertThat(subscriptionnList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSubscriptionn() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionnRepository.findAll().size();
        subscriptionn.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubscriptionnMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, UUID.randomUUID().toString())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(subscriptionn))
            )
            .andExpect(status().isBadRequest());

        // Validate the Subscriptionn in the database
        List<Subscriptionn> subscriptionnList = subscriptionnRepository.findAll();
        assertThat(subscriptionnList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSubscriptionn() throws Exception {
        int databaseSizeBeforeUpdate = subscriptionnRepository.findAll().size();
        subscriptionn.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSubscriptionnMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(subscriptionn))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Subscriptionn in the database
        List<Subscriptionn> subscriptionnList = subscriptionnRepository.findAll();
        assertThat(subscriptionnList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSubscriptionn() throws Exception {
        // Initialize the database
        subscriptionn.setId(UUID.randomUUID().toString());
        subscriptionnRepository.saveAndFlush(subscriptionn);

        int databaseSizeBeforeDelete = subscriptionnRepository.findAll().size();

        // Delete the subscriptionn
        restSubscriptionnMockMvc
            .perform(delete(ENTITY_API_URL_ID, subscriptionn.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Subscriptionn> subscriptionnList = subscriptionnRepository.findAll();
        assertThat(subscriptionnList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
